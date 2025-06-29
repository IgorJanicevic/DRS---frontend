import React, { useState, useEffect, useRef } from "react";
import { UserRegister } from "../models/userModel";
import { getUserProfile, updateUserProfile } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import "../assets/ProfilePage.css";
import { Loader } from "./Loader";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const [userProfile, setUserProfile] = useState<UserRegister | null>(null);
  const [updatedProfile, setUpdatedProfile] = useState<UserRegister | null>(null);
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<{ sub: string }>(token);
      setUserId(decodedToken.sub);
      fetchUserProfile(decodedToken.sub);
    }
  }, [isOpen]);

  const fetchUserProfile = async (user_id: string) => {
    try {
      const profile = await getUserProfile(user_id);
      setUserProfile(profile);
      setUpdatedProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
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
      const updatedData = {
        ...updatedProfile,
        ...(password && { password }),
      };

      try {
        await updateUserProfile(userId, updatedData);
        setUserProfile(updatedProfile);
        alert("Profile updated successfully");
        onClose();
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile");
      }
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const formFields = [
    { label: "Username", name: "username", type: "text" },
    { label: "First Name", name: "first_name", type: "text" },
    { label: "Last Name", name: "last_name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Mobile", name: "mobile", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "Country", name: "country", type: "text" },
  ];

  return (
    <div
      ref={modalRef}
      onClick={handleOutsideClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          backgroundColor: "#fdfdfd",
          borderRadius: "20px",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          scrollbarWidth: "none",       
          msOverflowStyle: "none",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "1.8rem",
            color: "#999",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        {userProfile ? (
          <>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                color: "#333",
                fontWeight: 600,
              }}
            >
              Edit Profile
            </h2>

            {/* Render all fields except password */}
            {formFields.map((field) => (
              <div key={field.name} style={{ marginBottom: "16px", marginInline: "5%" }}>
                <label
                  htmlFor={field.name}
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                    color: "#444",
                  }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={(updatedProfile as any)?.[field.name] || ""}
                  onChange={handleChange}
                  className="form-input"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "0.95rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    outline: "none",
                  }}
                />
              </div>
            ))}

            {/* Password input (handled separately) */}
            <div style={{ marginBottom: "20px", marginInline: "5%" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                  color: "#444",
                }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  fontSize: "0.95rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
            </div>

            <button
              onClick={handleSave}
              style={{
                marginBlock: "20px",
                backgroundColor: "#007bff",
                color: "#fff",
                fontWeight: 600,
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "60%",
                alignContent: "center",
                marginLeft: "20%",
                height: "40px",
                fontSize: "1rem",
              }}
            >
              Save Changes
            </button>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
