import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import "../assets/EditPostPopup.css";
import { getPostForEdit } from '../services/postService';
import { Post } from '../models/postModel';
import { Loader } from './Loader';

interface EditPostPopupProps {
  postId: string;
  onClose: () => void;
  onSave: (updatedPost: { description: string; image_url?: string; status: string }) => void;
}

export const EditPostPopup: React.FC<EditPostPopupProps> = ({ postId, onClose, onSave }) => {
  const [post, setPost] = useState<{ description: string; image_url?: string; status: string }>({ description: '', image_url: undefined, status: "Pending" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fetchPost, setFetchPost] = useState<Post>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostForEdit(postId);
        setFetchPost(fetchedPost);
        setPost({ description: fetchedPost.description, image_url: fetchedPost.image_url, status: "Pending" });
        setLoading(false);
      } catch (err) {
        if(err instanceof Error) {
          setError(err.message);}else{
        setError('Failed to fetch post');}
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSave = () => {
    if (fetchPost?.description !== post.description || fetchPost?.image_url !== post.image_url) {
      onSave(post);
    }
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result != null)
          setPost({ ...post, image_url: fileReader.result as string });
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  if (loading) return ReactDOM.createPortal(<Loader />, document.body);
  if (error) {
    return ReactDOM.createPortal(
      <div className="error-popup">
        <div className="error-content">
          <button className="close-error" onClick={onClose}>
            &times;
          </button>
          <p>Post not found</p>
        </div>
      </div>,
      document.body
    );
  }
  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Edit Post</h2>
        <form>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={post.description}
              onChange={(e) => setPost({ ...post, description: e.target.value })}
              rows={4}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            {post.image_url && (
              <div className="image-preview">
                <img src={post.image_url} alt="Current" style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }} />
              </div>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="button" className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};
