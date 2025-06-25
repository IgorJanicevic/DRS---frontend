import {UserProfile, UserRegister} from "../models/userModel"
import { BACKEND_URL } from "./serviceUtils";

export const loginUser = async(username:string,password:string):Promise<string>=>{
    const response = await fetch(`${BACKEND_URL}/user/login`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username:username,
            password:password
        }),
    });
    
    if(!response.ok){
        throw new Error('Failed to log in');
    }
    const data = await response.json();
    return data.token;
}

export const registerUser= async(user:UserRegister | undefined):Promise<string>=>{
    const response = await fetch(`${BACKEND_URL}/user/register`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    if(!response.ok){
        const errorData = await response.json();
        alert(errorData.message);
        throw new Error(errorData.message);
    }

    const data = await response.json();
    return data.token;
}


export const getUserProfile= async(id:string):Promise<UserProfile>=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${BACKEND_URL}/user/${id}`,{
        method:'GET',
        headers:{
            'Authorization': token + '',
            'Content-Type': 'application/json'
        }
    });

    if(!response.ok){
        throw new Error("Error with profile");
    }

    return await response.json();
}

export const getUserByUsername= async(username:string):Promise<UserProfile>=>{
    const response = await fetch(`${BACKEND_URL}/user/username/${username}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    });

    if(!response.ok){
        throw new Error("Error with profile");
    }
    return await response.json();
}

export const updateUserProfile= async(user_id:string,userData:UserRegister | any):Promise<string>=>{
    const token = localStorage.getItem('token');
    const response = await fetch(`${BACKEND_URL}/user/${user_id}`,
        {
            method:'PUT',
            headers:{
                'Authorization':token+'',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
    );
    
    if(!response.ok){
        throw new Error('Error with updating user.');
    }

    return response.json();
}
