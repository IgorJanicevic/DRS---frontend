import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { PostCard } from "../components/PostCard";
import { Post } from "../models/postModel";
import '../assets/PostCard.css';
import { getAllPendingPosts, acceptPost, rejectPost } from "../services/postService";




export const AdminPostPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllPosts = async () => {
    try {
      setPosts(await getAllPendingPosts());
    } catch (error) {
      console.error("Greška prilikom učitavanja objava:", error);
    }
  };

  useEffect(() => {
    getAllPosts();

    const socket = io("http://127.0.0.1:5000", {
      transports: ["polling", "websocket"],
    });

    socket.on("connect", () => {
      console.log("Konekcija uspostavljena!");
    });

    socket.on("new_post", (data) => {
      console.log("Nova objava je primljena:", data);
      setPosts((prevPosts) => [...prevPosts, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("new_post");
      socket.disconnect();
    };
  }, []);

      const handleAccept = async (postId: string) => {
        try {
            const result = await acceptPost(postId);
            console.log('Post accepted:', result);
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
          } catch (error) {
            console.error('Error accepting post:', error);
        }
    };

    const handleReject = async (postId: string) => {
        try {
            const result = await rejectPost(postId);
            console.log('Post rejected:', result);
            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
          } catch (error) {
            console.error('Error rejecting post:', error);
        }
    };

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
                  disabled={post.status === "Accepted"}
                >
                  Accept
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleReject(post._id)}
                  disabled={post.status === "Rejected"}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nema novih objava.</p>
        )}
      </div>
    </div>
  );
};
