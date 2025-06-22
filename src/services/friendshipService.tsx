import { UserProfile } from "../models/userModel";
import { BACKEND_URL } from "./serviceUtils";



export const acceptFriendship = async (friendship_id: string): Promise<string> => {
    try {
      const response = await fetch(`${BACKEND_URL}/friendship/${friendship_id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to accept friendship');
      }
  
      const data = await response.json();
      return data.message || 'Friendship accepted';
    } catch (error) {
      console.error('Error accepting friendship:', error);
      throw new Error('Error accepting friendship');
    }
  };
  
  export const rejectFriendship = async (friendship_id: string): Promise<string> => {
    try {
        const response = await fetch(`${BACKEND_URL}/friendship/${friendship_id}/reject`, {
            method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to reject friendship');
      }
  
      const data = await response.json();
      return data.message || 'Friendship rejected';
    } catch (error) {
      console.error('Error rejecting friendship:', error);
      throw new Error('Error rejecting friendship');
    }
  };
  

  export const doesFriendshipExist = async (myId: any, userId: any): Promise<string> => {
    try {
      const response = await fetch(`${BACKEND_URL}/friendship/status/${myId}/${userId}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
        return data.message;
    } catch (error) {
      console.error("Error checking friendship status:", error);
      return 'None';
    }
  };

  export const createFriendship = async (myId: string, userId: string): Promise<string> => {
    try {
      const response = await fetch('${BACKEND_URL}/friendship/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: myId,
          friend_id: userId
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create friendship');
      }
  
      const data = await response.json();
      return data.message || 'Friendship request sent';
    } catch (error) {
      console.error('Error creating friendship:', error);
      throw new Error('Error creating friendship');
    }
  };


export const getSuggestedFriends = async (my_id:string): Promise<UserProfile[]> => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/suggested/${my_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to create friendship');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating friendship:', error);
      throw new Error('Error creating friendship');
    }
};

  
  
  