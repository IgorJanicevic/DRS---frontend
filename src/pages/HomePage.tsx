import React, { useState,useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import "../assets/HomePage.css"
import { GetFriendsPosts } from "../services/postService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../components/Navbar";
import { Post } from "../models/postModel";
import { CreatePost } from "../components/CreatePost";


export const HomePage: React.FC = () => {
    const [posts,setPosts]= useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token'); 
      if (token) {
          const decodedToken = jwtDecode<CustomJwtPayload>(token); 
          loadPosts(decodedToken.sub);
      }
    }, []); 
  

    const loadPosts = async (user_id: string) => {
      if (isLoading) return;
      setIsLoading(true);
  
      try {
          const posts = await GetFriendsPosts(user_id);
          setPosts(posts);
      } catch (error) {
          console.error("Error loading posts:", error);
      } finally {
          setIsLoading(false);
      }
  };
  
  




  return (<>
    <div className="home-page">
      <Navbar />
      <div className="home-layout">

        <div className="left-side">
          <p>Levi panel: Možete dodati linkove, informacije, ili bilo šta drugo.</p>
        </div>

        <div className="main-content">
          <CreatePost />
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <h3>Find new friends!</h3> 
          )}
        </div>

        <div className="right-side">
          <p>Desni panel: Možete dodati widgete, oglase, ili bilo šta drugo.</p>
        </div>
      </div>
    </div>
    </>
  );
};
