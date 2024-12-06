export interface NotificationModel {
    user_id: string;
    type: string;
    message: string;
    status: string;
    created_at: string;
    metadata: MetadataType;
  }
  
  export interface MetadataType {
    friendship_id?: string; 
    post_id?: string;       
    username?: string;        
    [key: string]: any;
  }
  