import { useState, useEffect, useRef } from "react";
import "../assets/Navbar.css";
import { getUserNotifications, markNotificationsAsRead } from "../services/notificationService";
import { NotificationModel } from "../models/notificationModel";




export const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const fetchNotifications = async () => {
    try {
      const data = await getUserNotifications();
      setNotifications(data);
      const unread = data.filter((n) => n.status === "unread").length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };


  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount!=0) markNotificationsAsRead(); // Mark as read when opened
  };


  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowNotifications(false);
      setUnreadCount(0);
    }
  };


  useEffect(() => {
    fetchNotifications();

    // Add event listener for outside click
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [unreadCount]);


  const handleFriendshipAction = (friendshipId: string | undefined, action: "accept" | "reject") => {
    console.log(`Friendship ${action} for ID: ${friendshipId}`);
    // Implement API call for accepting/rejecting friendship here
  };

  const handleEditPost = (postId: string | undefined) => {
    console.log(`Editing post with ID: ${postId}`);
    // Trigger popup or navigate to post editor
  };

  return (
    <>
     <div className="notification-bell" onClick={handleNotificationClick}>
  <span className="bell-icon"><img src="https://img.icons8.com/m_rounded/512/FD7E14/appointment-reminders.png" style={{width:"30px",height:"28px"}}></img></span>
  {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
</div>

{showNotifications && (
  <div className="notification-dropdown" ref={dropdownRef}>
    <ul>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <li
            key={index}
            className={notification.status === "unread" ? "unread" : ""}
          >
            <div className="notification-message">
              {notification.type === "info" && <span>{notification.message}</span>}

              {notification.type === "friendship_request" && (
                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    <span style={{ maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {notification.message} <br/><u>{notification.metadata.username}</u>
                    </span>

                    <div className="notification-buttons" style={{ display: "flex", flexDirection: "column", gap: "10px", marginLeft: "auto" }}>
                    <button
                        onClick={() =>
                        handleFriendshipAction(notification.metadata.friendship_id, "accept")
                        }
                    >
                        Accept
                    </button>
                    <button
                        className="reject"
                        onClick={() =>
                        handleFriendshipAction(notification.metadata.friendship_id, "reject")
                        }
                    >
                        Reject
                    </button>
                    </div>
                </div>
                )}

                {notification.type === "post_rejected" && (
                <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}>
                    <span style={{ maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {notification.message}.<br />Click edit for more information.
                    </span>
                    <div className="notification-buttons" style={{ marginLeft: "auto" }}>
                    <button
                        className="edit"
                        onClick={() => handleEditPost(notification.metadata.post_id)}
                    >
                        Edit
                    </button>
                    </div>
                </div>
                )}

            </div>
          </li>
        ))
      ) : (
        <li className="notification-empty">No notifications</li>
      )}
    </ul>
  </div>
)}


        
    </>
  );
};
