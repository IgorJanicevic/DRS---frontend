import { stringify } from "querystring";
import { DecodeToken } from "../components/ProtectRoutes";
import { NotificationModel } from "../models/notificationModel";
import { BACKEND_URL } from "./serviceUtils";

const API_BASE_URL = `${BACKEND_URL}/notification`;

export const getUserNotifications = async (): Promise<NotificationModel[]> => {
  try {
    const decoded = DecodeToken();
    const response = await fetch(`${API_BASE_URL}/user/${decoded?.sub}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    if (!response.ok) throw new Error("Failed to fetch notifications");
    const data= await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const markNotificationsAsRead = async (): Promise<void> => {
  try {
    const decoded = DecodeToken();
    const response = await fetch(`${API_BASE_URL}/mark-as-read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({"user_id":decoded?.sub})
    });
    if (!response.ok) throw new Error("Failed to mark notifications as read");
  } catch (error) {
    console.error("Error marking notifications as read:", error);
  }
};
