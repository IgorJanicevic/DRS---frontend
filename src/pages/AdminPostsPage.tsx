import React, { useState, useEffect } from 'react';
import { PostCard } from '../components/PostCard';
import { Post } from '../models/postModel';
import '../assets/PostCard.css';
import {
  getAllPendingPosts,
  acceptPost,
  rejectPost,
} from '../services/postService';
import { socket } from '../socket';

export const AdminPostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

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

  useEffect(() => {
    fetchAllPosts();
  
    const onNewPost = (newPost: Post) => {
      setPosts((prevPosts) => [...prevPosts, newPost]);
      console.log('Dobio je post: ', socket.id, newPost.description);
    };
  
    socket.on('new_post', onNewPost);
  
    return () => {
      socket.off('new_post', onNewPost);
      console.log('Odvezao se new_post: ', socket.id);
    };
  }, []);
  

  return (
    <div className="admin-post-page">
      <h1>Admin Panel</h1>
      <div className="posts-container">
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
          <p>No new posts.</p>
        )}
      </div>
    </div>
  );
};