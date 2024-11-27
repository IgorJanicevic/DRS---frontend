import { useState } from "react";
import { UserRegister } from "../models/userModel";
import { registerUser } from "../services/authService";
import "../assets/RegisterPage.css"


export const CreateUserPage = () => {
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
      const user: UserRegister = {
        username,
        first_name,
        last_name,
        email,
        mobile,
        password,
        address,
        city,
        country,
      };
  
      const response = await registerUser(user);
  
      alert('Registration successful!');
  
      setUsername('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setMobile('');
      setPassword('');
      setAddress('');
      setCity('');
      setCountry('');
    } catch (error) {
      console.error("Error with registration:", error);
      
      if (error instanceof Error) {
        if (error.message.includes("Email")) {
          setEmail('');
        }
  
        if (error.message.includes("Username")) {
          setUsername('');
        }
      } 
    }
  };
  

  return (
    <>
    <div className="register-container" style={{backgroundImage: "url(https://cdn.leonardo.ai/users/a1057d29-236f-4cfa-b60c-66c4061fd2fd/generations/4cc915d1-8142-4d27-ad7f-54d5b1bb6334/Leonardo_Phoenix_A_highcontrast_cinematic_photograph_of_a_slee_0.jpg)"}}>
        
        {/* <div className="text-overlay">
            <h1>Start a wave of change!</h1>
            <p>With just one click, you create a new profile,<br/> and maybe that user will become part of the next big story on our network.</p>
        </div> */}

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


