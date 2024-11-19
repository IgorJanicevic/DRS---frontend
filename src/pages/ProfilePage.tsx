import { useState, useEffect } from "react";
import { UserRegister } from "../models/userModel";
import { getUserProfile } from "../services/authService";
import { updateUserProfile } from "../services/authService";  // Pretpostavljam da postoji funkcija za ažuriranje profila
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload, Navbar } from "../components/Navbar";

export const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState<UserRegister | null>(null);
    const [userId,setUserId] = useState('');
    const [editing, setEditing] = useState<boolean>(false);
    const [updatedProfile, setUpdatedProfile] = useState<UserRegister | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        let user_id =null;

        if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token); 
            setUserId(decodedToken.sub); 
            user_id= decodedToken.sub;
            alert(user_id)
        }
        if (user_id) {
            fetchUserProfile(user_id);
        }
    }, []);

    const fetchUserProfile = async (user_id: string) => {
        try {
            const profile = await getUserProfile(user_id);
            setUserProfile(profile);
            setUpdatedProfile(profile);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            alert("Failed to load profile");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (updatedProfile) {
            setUpdatedProfile({ ...updatedProfile, [name]: value });
        }
    };

    const handleSave = async () => {
        if (updatedProfile) {
            try {
                await updateUserProfile(userId,updatedProfile); 
                setUserProfile(updatedProfile);
                alert("Profile updated successfully");
            } catch (error) {
                console.error('Error updating profile:', error);
                alert("Failed to update profile");
            }
        }
    };

    return (<><Navbar/>
        <div className="profile-container">
            {userProfile ? (
                <div className="profile-details">
                    <h1>Profile of {userProfile.username}</h1>
                    <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={updatedProfile?.username}
                            onChange={handleChange}>
                        </input>
                    <div>
                        
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="first_name" 
                            value={updatedProfile?.first_name} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="text" 
                            name="last_name" 
                            value={updatedProfile?.last_name} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={updatedProfile?.email} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Mobile:</label>
                        <input 
                            type="text" 
                            name="mobile" 
                            value={updatedProfile?.mobile} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input 
                            type="text" 
                            name="address" 
                            value={updatedProfile?.address} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>City:</label>
                        <input 
                            type="text" 
                            name="city" 
                            value={updatedProfile?.city} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Country:</label>
                        <input 
                            type="text" 
                            name="country" 
                            value={updatedProfile?.country} 
                            onChange={handleChange} 
                        />
                    </div>
                        <button onClick={handleSave}>Save Changes</button>                    
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
        </>
    );
};
