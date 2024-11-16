import {UserRegister} from "../models/userModel"

export const loginUser = async(username:string,password:string):Promise<string>=>{
    const response = await fetch('http://127.0.0.1:5000/user/login',{
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
    const response = await fetch('http://localhost:5000/user/register',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if(!response.ok){
        throw new Error("Failed to register.");
    }

    const data = await response.json();
    return data.token;
}
