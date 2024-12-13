import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../components/ProtectRoutes";
import { PostCard } from "../components/PostCard";
import { GetUserPosts } from "../services/postService";
import { Post } from "../models/postModel";
import { EditProfile } from "../components/EditProfile";  // Pretpostavljam da si već napravio ovu komponentu
import { Navbar } from "../components/Navbar";
import { createFriendship, doesFriendshipExist } from "../services/friendshipService";

export const ProfilePage = () => {
  const { userId: urlUserId } = useParams<{ userId: string }>(); // Dobijanje user_id sa URL-a
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [friendshipStatus, setFriendshipStatus] = useState<any>(null);


  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const currentUserId = decodedToken?.sub; // ID korisnika iz tokena

  useEffect(() => {
    if (urlUserId) {
      fetchUserProfile(urlUserId);
      fetchUserPosts(urlUserId);
    
    }
  }, [urlUserId]);

  useEffect(() => {
    const checkFriendshipStatus = async () => {
      const status = await doesFriendshipExist(currentUserId, urlUserId);
      setFriendshipStatus(status);
    };

    checkFriendshipStatus();
  }, [currentUserId, urlUserId]);

  const fetchUserProfile = async (user_id: string) => {
    try {
      const profile = await getUserProfile(user_id);
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("Failed to load profile");
    }
  };

  const fetchUserPosts = async (user_id: string) => {
    try {
      const posts = await GetUserPosts(user_id);
      setUserPosts(posts);
      setLoadingPosts(false);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      setLoadingPosts(false);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true); // Otvoriće EditProfile komponentu
  };

  const handleAddFriend = async () => {
    if (currentUserId && urlUserId) {
      try {
        const response = await createFriendship(currentUserId, urlUserId);
  
          setFriendshipStatus("ISentRequest");
        
      } catch (error) {
        console.error("Error sending friend request:", error);
      }
    }
  };
  

  const handleRemoveFriend = () => {
    // Logika za uklanjanje prijatelja
    console.log('Removing friend...');
  };

  const handleCancelRequest = () => {
    // Logika za otkazivanje zahteva za prijateljstvo
    console.log('Cancelling friend request...');
  };

  const handleAcceptRequest = () => {
    // Logika za prihvatanje zahteva za prijateljstvo
    console.log('Accepting friend request...');
  };

  return (<><div className="profile-page">
    <Navbar />
    <div className="profile-container">
      <div className="profile-details">
        {userProfile ? (
          <>
            <div className="profile-header">
              <div className="profile-image">
                <img
                  src={userProfile.profilePicture || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                  alt="Profile"
                  className="profile-img"
                />
              </div>
              <div className="profile-info">
                <h1>{userProfile.username}</h1>
                <div className="profile-name-city">
                  <p>{userProfile.first_name} {userProfile.last_name}</p>
                  <p>{userProfile.city}</p>
                  
                </div>
              </div>
              <div>
              {currentUserId === urlUserId ? (
                  <button className="edit-profile-btn" onClick={handleEditProfile}>
                    Edit Profile
                  </button>         
                ) : friendshipStatus === 'Accepted' ? (
                  <button className="edit-profile-btn" onClick={handleRemoveFriend}>
                    Remove
                  </button>
                ) : friendshipStatus === 'ISentRequest' ? (
                  <button className="edit-profile-btn" onClick={handleCancelRequest}>
                    Cancel Request
                  </button>
                ) : friendshipStatus === 'Pending' ? (
                  <button className="edit-profile-btn" onClick={handleAcceptRequest}>
                    Accept Friend Request
                  </button>
                ) : (
                  <button className="edit-profile-btn" onClick={handleAddFriend}>
                    Add Friend
                  </button>
                  )}
              </div>
            </div>
          

            {isEditing && <EditProfile />}
          </>
        ) : (
          <p>Loading user profile...</p>
        )}
      </div>

      <div className="user-posts">
        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : userPosts.length > 0 ? (
          userPosts.map((post) => <PostCard key={post._id} post={post}/>)
        ) : (
          <h1 style={{marginLeft:"36%", marginTop:"20%", color:"#333"}}>No posts yet.</h1>
        )}
      </div>
    </div>
    </div>
    </>
  );
};
