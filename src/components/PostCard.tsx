import React from "react";
import { Post } from "../models/postModel"; // Pretpostavljam da je interfejs u models folderu
import "../assets/PostCard.css"; // Dodaj stilove za ovu komponentu

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card" style={{marginLeft:"35px", backgroundColor:"white"}}>
      <div className="post-header">
        <span className="post-user-id">{post.username}</span>
        <span className="post-timestamp">
          {new Date(post.timestamp).toLocaleString()}
        </span>
      </div>

      {post.image_url!="" && (
        <div className="post-image">
          <img src={post.image_url} alt="Post" />
        </div>
      )}

      <div className="post-description">{post.description}</div>

    </div>
  );
};
