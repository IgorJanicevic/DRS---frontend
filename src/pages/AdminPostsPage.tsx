// AdminPostsPage.tsx
import React, { useState, useEffect } from "react";
import { PostCard } from "../components/PostCard";
import { Post } from "../models/postModel";
import "../assets/PostCard.css";
import { getAllPendingPosts, acceptPost, rejectPost } from "../services/postService";
import { Socket } from "socket.io-client";
import { DecodeToken } from "../components/ProtectRoutes";

interface AdminPostPageProps {
  socket: Socket | null;
}

export const AdminPostPage: React.FC<AdminPostPageProps> = ({ socket }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const decoded = DecodeToken();

  const getAllPosts = async () => {
    try {
      const allPosts = await getAllPendingPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error("Greška prilikom učitavanja objava:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
    if (socket) {
      console.log("Socket connected:", socket.id);

      socket.on("new_post", (data: Post) => {
        console.log("Primljen post preko WebSocket-a:", data);
        setPosts((prevPosts) => [data, ...prevPosts]);
        alert("OKEJ RADI");
      });

      return () => {
        console.log("Unmounting component... Disconnecting socket...");
        socket.off("new_post");
      };
    }
  }, [socket]);

  const handleAccept = async (postId: string) => {
    try {
      const result = await acceptPost(postId);
      console.log("Post accepted:", result);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error accepting post:", error);
    }
  };

  const handleReject = async (postId: string) => {
    try {
      const result = await rejectPost(postId);
      console.log("Post rejected:", result);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      alert("Post rejected successfully");
    } catch (error) {
      console.error("Error rejecting post:", error);
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
