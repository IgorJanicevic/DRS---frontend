import React, { useState, useEffect } from 'react';
import { PostCard } from '../components/PostCard';
import { Post } from '../models/postModel';
import '../assets/PostCard.css';
import '../assets/AdminPosts.css';
import {
  getAllPendingPosts,
  acceptPost,
  rejectPost,
} from '../services/postService';
import { io } from 'socket.io-client';
import { DecodeToken } from '../components/ProtectRoutes';

export const AdminPostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const decoded = DecodeToken();

  const fetchAllPosts = async () => {
    try {
      const allPosts = await getAllPendingPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAccept = async (postId: string) => {
    try {
      await acceptPost(postId);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error('Error accepting post:', error);
    }
  };

  const handleReject = async (postId: string) => {
    try {
      await rejectPost(postId);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error('Error rejecting post:', error);
    }
  };

  const onNewPost = (newPost: Post) => {
    console.log('Uslo u adminpost new post');
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    fetchAllPosts();

    const socket = io('http://localhost:5000', {
      transports: ['websocket'],
      query: {user_id: decoded?.sub, role: decoded?.role}
    });
    
    socket.on('new_post', (newPost: Post) => {
      console.log('Primljena nova objava:', newPost);
      onNewPost(newPost);
    });

    return () => {
      socket.off('new_post');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="admin-post-page">
      <div className="posts-container">
      <h1>Pending Posts</h1>

        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-item">
              <PostCard post={post} />
              <div className="post-actions">
                <button
                  className="accept-button"
                  onClick={() => handleAccept(post._id)}
                >
                  Accept
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleReject(post._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{marginLeft:'32%'}}>No new posts.</p>
        )}
      </div>
    </div>
  );
};
