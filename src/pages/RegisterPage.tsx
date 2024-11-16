import { useState } from "react";
import { UserRegister } from "../models/userModel";
import { registerUser } from "../services/authService";

export const RegisterPage = () => {
  const [userData, setUserData] = useState<UserRegister>();
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const register = async () => {
    try {
      setUserData({
        username,
        first_name,
        last_name,
        email,
        mobile,
        password,
        address,
        city,
        country,
      });
      const response = await registerUser(userData!);
      alert('Registration successful!');
    } catch (error) {
      console.log("Error with registration user");
    }
  };

  return (
    <div className="register-container">
      <div className="image-container">
        <img
          src="https://i.pinimg.com/originals/4e/1f/df/4e1fdfb8a7eef2adf6c6b8e33f2f00e6.png"
          alt="Sample"
          className="image"
        />
        <div className="text-overlay">
          <h1>Join Us!</h1>
          <p>Create an account to access exclusive content.</p>
        </div>
      </div>

      <div className="register-right">
        <form className="register-form">
          <h1 className="register-title">Create an Account</h1>
          <p className="register-subtitle">Fill in the details below:</p>

          <div className="register-input-group">
            <label htmlFor="username" className="register-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="register-input"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="first_name" className="register-label">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="register-input"
              placeholder="Enter your first name"
              value={first_name}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="last_name" className="register-label">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="register-input"
              placeholder="Enter your last name"
              value={last_name}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="email" className="register-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="register-input"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="mobile" className="register-label">Mobile</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              className="register-input"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="password" className="register-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="register-input"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="address" className="register-label">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="register-input"
              placeholder="Enter your address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="city" className="register-label">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className="register-input"
              placeholder="Enter your city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
          </div>

          <div className="register-input-group">
            <label htmlFor="country" className="register-label">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              className="register-input"
              placeholder="Enter your country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
          </div>

          <button type="button" onClick={register} className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};
