
import { useState, useEffect, useRef } from 'react';
import { PostCard } from '../components/PostCard';
import { Post } from '../models/postModel';
import '../assets/PostCard.css';
import '../assets/AdminPosts.css';
import {
  getAllPendingPosts,
  acceptPost,
  rejectPost,
} from '../services/postService';
import { io, Socket } from 'socket.io-client';
import { DecodeToken } from '../components/ProtectRoutes';
import { BACKEND_URL } from '../services/serviceUtils';

export const AdminPostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const decoded = DecodeToken();

  function formatTimestamp(isoString: string) {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Invalid date';

    return date.toLocaleString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

 const fetchAllPosts = async () => {
  try {
    const allPosts = await getAllPendingPosts();

    const postsWithValidTimestamp = allPosts.map(post => {
      const timestamp =
        post.timestamp && !isNaN(new Date(post.timestamp).getTime())
          ? post.timestamp
          : new Date().toISOString();
      return { ...post, timestamp };
    });

    const sortedPosts = postsWithValidTimestamp.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setPosts(sortedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};


  const handleAccept = async (postId: string) => {
    try {
      await acceptPost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error accepting post:', error);
    }
  };

  const handleReject = async (postId: string) => {
    try {
      await rejectPost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error rejecting post:', error);
    }
  };

  const onNewPost = (newPost: Post) => {
    console.log('Got new post:', { newPost });

    const timestamp = newPost.timestamp && !isNaN(new Date(newPost.timestamp).getTime())
      ? newPost.timestamp
      : new Date().toISOString();

    const postWithTimestamp = { ...newPost, timestamp };

    setPosts((prevPosts) => {
      const exists = prevPosts.find((p) => p._id === postWithTimestamp._id);

      if (exists) {
        return prevPosts
          .map((p) => (p._id === postWithTimestamp._id ? postWithTimestamp : p))
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      } else {
        return [postWithTimestamp, ...prevPosts].sort((a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
    });
  };

  useEffect(() => {
    fetchAllPosts();

    const socket = io(BACKEND_URL, {
      transports: ['websocket'],
      query: { user_id: decoded?.sub, role: decoded?.role },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('new_post', onNewPost);

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    return () => {
      socket.off('new_post', onNewPost);
      socket.disconnect();
      console.log('Socket cleanup complete');
    };
  }, []);

  return (
    <div className="admin-post-page">
      <div className="posts-container">
        <h1>Pending Posts</h1>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-item">
              <PostCard post={{ ...post, timestamp: formatTimestamp(post.timestamp) }} />
              <div className="post-actions" style={{ marginTop: '8px' }}>
                <button className="accept-button" onClick={() => handleAccept(post._id)}>
                  Accept
                </button>
                <button className="reject-button" onClick={() => handleReject(post._id)}>
                  Reject
                </button>
                <div
                  className="post-timestamp"
                  style={{ fontSize: '0.85rem', color: '#555', marginTop: '6px' }}
                >
                  {formatTimestamp(post.timestamp)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ marginLeft: '32%' }}>No new posts.</p>
        )}
      </div>
    </div>
  );
};
