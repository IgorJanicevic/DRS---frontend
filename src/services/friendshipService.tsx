


export const acceptFriendship = async (friendship_id: string): Promise<string> => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/friendship/${friendship_id}/accept`, {
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
        const response = await fetch(`http://localhost:5000/friendship/${friendship_id}/reject`, {
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
  