import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../components/ProtectRoutes";
import { PostCard } from "../components/PostCard";
import { GetUserPosts, updatePost } from "../services/postService";
import { Post } from "../models/postModel";
import { EditProfile } from "../components/EditProfile";  // Pretpostavljam da si već napravio ovu komponentu
import { Navbar } from "../components/Navbar";
import { createFriendship, doesFriendshipExist } from "../services/friendshipService";
import { isEditable } from "@testing-library/user-event/dist/utils";

export const ProfilePage = () => {
  const { userId: urlUserId } = useParams<{ userId: string }>(); // Dobijanje user_id sa URL-a
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [friendshipStatus, setFriendshipStatus] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  


  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const currentUserId = decodedToken?.sub;

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
      setPreviewImage(profile.profile_img);
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
    if(isEditing){
      setIsEditing(false); 
    }else{
      setIsEditing(true);
    }
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleProfilePictureClick = () => {
    if(currentUserId === urlUserId){
      fileInputRef.current?.click();
    }
  };

  const uploadNewProfilePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result != null && currentUserId) {
          updateUserProfile(currentUserId, {"profile_img":fileReader.result as string});
          setPreviewImage(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
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
                    src={previewImage || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
                    alt="Profile"
                    className="profile-img"
                    onClick={handleProfilePictureClick} // Otvorite dijalog kada kliknete na sliku
                  />
                  {/* Sakriveni input za odabir nove slike */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={uploadNewProfilePicture} // Kada odaberete fajl, poziva se funkcija
                    accept="image/*"
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
