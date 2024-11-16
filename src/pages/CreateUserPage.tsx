import { useState } from "react";
import { UserRegister } from "../models/userModel";
import { registerUser } from "../services/authService";
import "../assets/RegisterPage.css"


export const CreateUserPage = () => {
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
    <>
    <div className="register-container">
        
        <div className="text-overlay">
            <h1>Start a wave of change!</h1>
            <p>With just one click, you create a new profile,<br/> and maybe that user will become part of the next big story on our network.</p>
        </div>

        <div className="register-right">
            <h1 className="register-title">Create an Account</h1>
            <p className="register-subtitle">Expand our community</p>

            <div className="register-form">
                <div className="form-group">

                <div className="register-input-group">
                    <input
                    type="text"
                    id="username"
                    name="username"
                    className="register-input"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    />
                </div>
                <div className="register-input-group">
                    <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="register-input"
                    placeholder="First Name"
                    value={first_name}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                    />
                </div>

                <div className="register-input-group">
                    <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="register-input"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                    />
                </div>

                <div className="register-input-group">
                    <input
                    type="email"
                    id="email"
                    name="email"
                    className="register-input"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    />
                </div>

                
                </div>

                <div className="form-group" style={{marginRight:"5%"}}>
                    
                <div className="register-input-group">
                    <input
                    type="text"
                    id="address"
                    name="address"
                    className="register-input"
                    placeholder="Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                    />
                </div>

                <div className="register-input-group">
                    <input
                    type="text"
                    id="city"
                    name="city"
                    className="register-input"
                    placeholder="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    required
                    />
                </div>

                <div className="register-input-group">
                    <input
                    type="text"
                    id="country"
                    name="country"
                    className="register-input"
                    placeholder="Country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    required
                    />
                </div>

                <div className="register-input-group">
                    <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    className="register-input"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    required
                    />
                </div>
                </div>
            </div>
          <label className="register-link">I accept the <a href="privacy-policy" style={{color:"Black"}}>Privacy Policy</a></label>
          <button type="button" onClick={register} className="register-button">Register</button>
      </div>
    </div>
    </>
  );
};


