import React from "react";

interface UserCardProps {
  user: any;
  onUnblock?: (userId: string) => void;
  showUnblockButton?: boolean;
  onClick?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onUnblock, showUnblockButton = false, onClick }) => {
  return (
    <div className="user-card" onClick={onClick}>
      <div className="user-card-info">
        <img
          src={user.profile_img || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"}
          alt="Profile"
          className="profile-img"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <h3>{user.first_name} {user.last_name}</h3>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
        <p><strong>City:</strong> {user.city || 'N/A'}</p>
        <p><strong>Country:</strong> {user.country || 'N/A'}</p>
        <p><strong>Mobile:</strong> {user.mobile || 'N/A'}</p>

        {showUnblockButton && onUnblock && (
          <button onClick={(e) => {
            e.stopPropagation();
            onUnblock(user._id);
          }} className="unblock-button">
            Unblock User
          </button>
        )}
      </div>
    </div>
  );
};
