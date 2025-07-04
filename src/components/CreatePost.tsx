import React, { useState } from "react";
import { createPost } from "../services/postService";
import "../assets/CreatePost.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { CustomJwtPayload } from "./ProtectRoutes";

export const CreatePost = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("General");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState<boolean>(false);

  const handlePost = async () => {
    if (!description.trim() && !previewImage) {
      alert("Description or an image is required!");
      return;
    }

    setIsPosting(true);

    try {
        const token = localStorage.getItem('token'); 
        let user_id='';
        if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token); 
            user_id = decodedToken.sub;

        }else{
            navigate('/login');
            return;
        }

        let imageUrl = '';

        if (selectedImage) {
          imageUrl = await convertToBase64(selectedImage);
        }

        if (previewImage!=null){
          imageUrl= previewImage;
        }
        if(imageUrl!=null){
          setType('General');
        }else{
          setType('Status');
        }

       await createPost({
        "user_id": user_id,
        "description": description,
        "image_url": imageUrl,
        "type": type
      });

      alert("Post created successfully!");
      setDescription("");
      setType("General");
      setSelectedImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setIsPosting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if(fileReader.result!=null)
        setPreviewImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  // Funkcija za konverziju slike u Base64 string
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string); // Vraća Base64 string
      };
      reader.onerror = reject;
      reader.readAsDataURL(file); // Konvertuje u Base64
    });
  };

  return (
    <div className="create-post-container">
      <div className="post-header">
        <h4 style={{marginLeft:"44%"}}>New post</h4>
      </div>
      <textarea
        className="post-input"
        placeholder="What's on your mind?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isPosting}
      />
      <div className="image-upload">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isPosting}
        />
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}
      </div>
      <button
        // style={{backgroundImage:"url(https://cdn.leonardo.ai/users/a1057d29-236f-4cfa-b60c-66c4061fd2fd/generations/b160ee39-9819-4411-9382-4229113f32c8/Leonardo_Phoenix_A_dramatic_cinematic_photograph_serving_as_a_1.jpg)"}}
        className="post-button"
        onClick={handlePost}
        disabled={isPosting}
      >
        {isPosting ? "Posting..." : "Post"}
      </button>
    </div>
  );
};
