import { useState, useEffect, useRef } from "react";
import "../assets/Navbar.css";
import { getUserNotifications, markNotificationsAsRead } from "../services/notificationService";
import { NotificationModel } from "../models/notificationModel";
import { socket } from "../socket";
import { DecodeToken } from "./ProtectRoutes";
import { EditPostPopup } from "./EditPostPopup";
import { CreatePost } from "./CreatePost";
import { updatePost } from "../services/postService";


export const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
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
    if (!showNotifications && unreadCount !== 0) markNotificationsAsRead();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowNotifications(false);
      setUnreadCount(0);
    }
  };

  const handleEditPost = (postId: string | undefined) => {
    if (postId) setSelectedPostId(postId);
  };

  const handlePopupClose = () => {
    setSelectedPostId(null);
  };

  const handlePostSave = (updatedPost: { description: string; image_url?: string; status:string}) => {
    console.log("Updated post:", updatedPost);

    if(selectedPostId)
    updatePost(selectedPostId,updatedPost);
    handlePopupClose();
    alert('Post updated successfully');
  };

  useEffect(() => {
    fetchNotifications();

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [unreadCount]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!");
    });

    socket.on("notification", (data: NotificationModel) => {
      console.log("Notification received");
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("notification");
    };
  }, []);

  return (
    <>
      <div className="notification-bell" onClick={handleNotificationClick}>
        <span className="bell-icon">
          <img
            src="https://img.icons8.com/m_rounded/512/FD7E14/appointment-reminders.png"
            style={{ width: "30px", height: "28px" }}
            alt="Bell Icon"
          />
        </span>
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

                    {notification.type === "post_rejected" && (
                      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <span
                          style={{
                            maxWidth: "260px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {notification.message}.<br />Click edit for more information.
                        </span>
                        <div
                          className="notification-buttons"
                          style={{ marginLeft: "auto" }}
                        >
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

{selectedPostId && (
        <EditPostPopup
          postId={selectedPostId}
          onClose={handlePopupClose}
          onSave={handlePostSave}
        />
      )}

      
    </>
  );
};
