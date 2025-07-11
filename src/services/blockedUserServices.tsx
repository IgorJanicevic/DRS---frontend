import { BACKEND_URL } from "./serviceUtils";
import { UserProfile } from "../models/userModel";

export const getBlockedUsers = async (): Promise<UserProfile[]> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BACKEND_URL}/blocked/users`, {
    method: "GET",
    headers:{
        'Authorization':token+'',
        'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch blocked users.");
  }
  const data = await response.json();
  return data.data;
};

export const unblockUser = async (userId: string): Promise<void> => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BACKEND_URL}/blocked/${userId}`, {
    method: "DELETE",
    headers:{
        'Authorization':token+'',
        'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to unblock user.");
  }
};
