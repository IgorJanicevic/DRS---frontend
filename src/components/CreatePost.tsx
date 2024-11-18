import React, { useState } from "react";
import "../assets/CreatePost.css";

export const CreatePost = () => {
  const [postContent, setPostContent] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const handlePost = async () => {
    if (!postContent.trim() && !selectedImage) {
      alert("Post content or an image is required!");
      return;
    }

    setIsPosting(true);

    try {
      const formData = new FormData();
      formData.append("content", postContent);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: formData, // Slanje formData za tekst i fajl
      });

      if (!response.ok) {
        throw new Error("Failed to create post.");
      }

      alert("Post created successfully!");
      setPostContent("");
      setSelectedImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generisanje URL-a za pregled slike
    }
  };

  return (
    <div className="create-post-container">
      <div className="post-header">
        <h2>Create a Post</h2>
      </div>
      <textarea
        className="post-input"
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        disabled={isPosting}
      />
      <div className="image-upload">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isPosting}
        />
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}
      </div>
      <button
        className="post-button"
        onClick={handlePost}
        disabled={isPosting}
      >
        {isPosting ? "Posting..." : "Post"}
      </button>
    </div>
  );
};
