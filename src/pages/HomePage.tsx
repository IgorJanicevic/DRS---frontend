import React, { useState,useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import "../assets/HomePage.css"
import { GetUserPosts } from "../services/postService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../components/Navbar";
import { Post } from "../models/postModel";
import { CreatePost } from "../components/CreatePost";


export const HomePage: React.FC = () => {
    const [posts,setPosts]= useState<Post[]>([]);
    const [user_id,setUserId]= useState('');
    
    useEffect(() => {
        const token = localStorage.getItem('token'); 
        let user_id =null;

        if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token); 
            setUserId(decodedToken.sub); 
            user_id= decodedToken.sub;
        }
        if (user_id) {
            setUserId(user_id);
            loadPosts(user_id);
        }
        
    }, []);    

    const loadPosts = async (user_id:string) =>{
            setPosts( await GetUserPosts(user_id))
            //setPosts( await GetFriendsPosts(user_id))
    }




  return (
    <div className="home-page">
      <Navbar />
      <div className="home-layout">

        <div className="left-side">
          <p>Levi panel: Možete dodati linkove, informacije, ili bilo šta drugo.</p>
        </div>

        <div className="main-content">
          <CreatePost/>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <div className="right-side">
          <p>Desni panel: Možete dodati widgete, oglase, ili bilo šta drugo.</p>
        </div>
      </div>
    </div>
  );
};
