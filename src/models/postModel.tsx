export interface Post {
    _id: string;
    user_id: string;
    username: string;
    description: string;
    timestamp: string;
    type: string;
    status: string;
    image_url?: string;
  }

export interface PostCreate{
  user_id:string;
  description: string | '',
  image_url: string | undefined,
  type:string
}
  