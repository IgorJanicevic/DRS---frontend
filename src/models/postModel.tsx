export interface Post {
    _id: string;
    user_id: string;
    description: string;
    timestamp: string;
    type: string;
    status: string;
    image_url?: string;
  }
  