import React, { useEffect, useState } from "react";
import { UserCard } from "../components/UserCard";
import "../assets/SearchedUsers.css";
import { Navbar } from "../components/Navbar";
import { HomeLeftSide } from "../components/HomeLeftSide";
import { HomeRightSide } from "../components/HomeRightSide";
import { Loader } from "../components/Loader";
import { getBlockedUsers, unblockUser } from "../services/blockedUserServices";

export const AdminBlockedUserPage = () => {
  const [blockedUsers, setBlockedUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlockedUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getBlockedUsers();
      setBlockedUsers(data);
      setError("");
    } catch (err: any) {
      setError(err.message);
      setBlockedUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      await unblockUser(userId);
      setBlockedUsers(prev => prev.filter(user => user._id !== userId));
    } catch (err: any) {
      alert("Failed to unblock: " + err.message);
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  return (
  <div>
    <h1 style={{ marginLeft: '34%' }}>Blocked Users</h1>
    {error ? (
      <p style={{ color: "red" }}>{error}</p>
    ) : isLoading ? (
      <Loader />
    ) : blockedUsers && blockedUsers.length > 0 ? (
      <div className="user-cards-container">
        {blockedUsers.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            showUnblockButton={true}
            onUnblock={handleUnblock}
          />
        ))}
      </div>
    ) : (
      <h2 style={{paddingInline:"30%",marginTop:"10%"}}>No blocked users found.</h2>
    )}
  </div>
);
};
