import { Post,PostCreate} from "../models/postModel";

export const GetFriendsPosts= async(user_id:string):Promise<Post[]>=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`http://127.0.0.1:5000/post/friends/${user_id}`,{
        method:'GET',
        headers:{
            'Authorization':token+'',
            'Content-Type':'application/json',
        }
    });

    if(!response.ok){
        throw new Error('Error with getting user posts');
    }
    return response.json();

}

export const getAllPendingPosts= async():Promise<Post[]>=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/post/pending`,{
        method:'GET',
        headers:{
            'Authorization':token+'',
            'Content-Type':'application/json',
        }
    });

    if(!response.ok){
        throw new Error('Error with getting user posts');
    }
    return response.json();
}



export const GetUserPosts= async(user_id:string):Promise<Post[]>=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/post/user/${user_id}`,{
        method:'GET',
        headers:{
            'Authorization':token+'',
            'Content-Type':'application/json',
        }
    });

    if(!response.ok){
        throw new Error('Error with getting user posts');
    }
    return response.json();
}

export const createPost= async(data:PostCreate)=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/post/create`,{
        method:'POST',
        headers:{
            'Authorization':token+'',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error('errror');
    }
    return response.json();
}


export const acceptPost = async (postId: string): Promise<any> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/post/accept/${postId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Error accepting the post');
    }
    return response.json();
};

export const rejectPost = async (postId: string): Promise<any> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/post/reject/${postId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Error rejecting the post');
    }
    return response.json();
};
