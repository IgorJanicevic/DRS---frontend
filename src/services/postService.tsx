import { Post } from "../models/postModel";


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