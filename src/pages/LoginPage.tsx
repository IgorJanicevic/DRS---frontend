import { useState } from "react";
import "../assets/LoginPage.css"
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";



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
        navigate("/");
        }catch(error){
            setPassword('');
            setError(true);
        }
    }

    

    
    



  return (
    <div className="login-container">
      <div className="image-container">
        <img
            src="https://i.pinimg.com/originals/4e/1f/df/4e1fdfb8a7eef2adf6c6b8e33f2f00e6.png"
            alt="Sample"
            className="image"
        />
        <div className="text-overlay">
            <h1>Take a look on ducina mama fotke!</h1>
            <p>hello frine</p>
        </div>
      </div>


      <div className="login-right">
        <form className="login-form">
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
  );
};
