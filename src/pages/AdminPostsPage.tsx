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

export const AdminPostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const decoded = DecodeToken();

  const fetchAllPosts = async () => {
    try {
      const allPosts = await getAllPendingPosts();
      const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
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
    console.log('Got new post:', {newPost});

    if (!newPost.timestamp) {
      newPost.timestamp = new Date().toISOString();
    }

    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts, newPost];
      return updatedPosts.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    });

    fetchAllPosts();
  };

  useEffect(() => {
    fetchAllPosts();

    socketRef.current = io('http://localhost:5000', {
      transports: ['websocket'],
      query: { user_id: decoded?.sub, role: decoded?.role },
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
    });

   

    return () => {
      if (socketRef.current) {
        socketRef.current.off('new_post');
        socketRef.current.disconnect();
        console.log('Socket cleanup complete');
      }
    };
  }, []);

  useEffect(() => {
   socketRef.current?.on('new_post', (newPost: Post) => {
      onNewPost(newPost);
    });
  }, [socketRef]);


  return (
    <div className="admin-post-page">
      <div className="posts-container">
        <h1>Pending Posts</h1>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-item">
              <PostCard post={post} />
              <div className="post-actions">
                <button className="accept-button" onClick={() => handleAccept(post._id)}>
                  Accept
                </button>
                <button className="reject-button" onClick={() => handleReject(post._id)}>
                  Reject
                </button>
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
