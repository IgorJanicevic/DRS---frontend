import React, { useState,useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import "../assets/HomePage.css"
import { GetFriendsPosts } from "../services/postService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../components/ProtectRoutes";
import { Post } from "../models/postModel";
import { CreatePost } from "../components/CreatePost";
import { HomeLeftSide } from "../components/HomeLeftSide";
import { HomeRightSide } from "../components/HomeRightSide";


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
      <div className="home-layout" >

      <div className="left-side" >
        <HomeLeftSide />
      </div>


        <div className="main-content">
          <CreatePost />
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <h2 style={{marginLeft:"38%", marginTop:"10%"}}>Find New Friends</h2> 
          )}
        </div>

        <div className="right-side" style={{marginTop:"1.4px"}}>
          <HomeRightSide />
        </div>
      </div>
    </div>
    </>
  );
};
