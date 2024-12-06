import { useState } from "react";
import "../assets/LoginPage.css"
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../components/ProtectRoutes";
import React from "react";



export const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const login = async ()=>{
        try{
        const token = await loginUser(username,password);
        localStorage.setItem('token',token);
        setError(false);
        let role ="";
        if (token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(token); 
            role= decodedToken.role;
            if(role==='admin'){
              navigate('/admin');
            }else{
              navigate('/');
            }
            
        }
        }catch(error){
            setPassword('');
            setError(true);
        }
    }

    

    
    



  return (
    <>
    <div className="register-container">
      
      <div className="text-overlay">
          {/* <h1>Take a look on ducina mama fotke!</h1>
          <p>hello frine</p> */}
      </div>

      <div className="register-right">
        <form className="login-form" style={{padding:"50px"}}>
          <h1 className="login-title">Welcome!</h1>
          <p className="login-subtitle">Please login to your account</p>
          <div className="login-input-group">
            <label htmlFor="username" className="login-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="login-input"
              placeholder="username"
              value={username}
              onChange={(event)=>setUsername(event.target.value)}
              required
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password" className={`login-label ${error ? 'error' : ''}`}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`login-input ${error ? 'error' : ''}`}
              placeholder="********"
              value={password}
              onChange={(event)=>{setPassword(event.target.value);setError(false)}}
              required
            />
          </div>
          <button type="button" onClick={login} className="login-button">Login</button>
          <p className="login-register-link">
            Don't have an account? <a href="/create" className="login-link">Register here</a>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};
