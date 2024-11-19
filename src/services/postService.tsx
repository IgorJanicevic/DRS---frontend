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