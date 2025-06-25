import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { UserRegister } from "../models/userModel";
import "../assets/RegisterPage.css"
import { Loader } from "../components/Loader";

export const AdminCreateUserPage = () => {
  const [formData, setFormData] = useState<UserRegister>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    country: "",
    password:"temp"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every((field) => field.trim() !== "");
    if (!allFieldsFilled) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const token = await registerUser(formData);
      alert("User registered successfully!");
      console.log("Token:", token);
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        address: "",
        city: "",
        country: "",
        password: "",
      }); // Reset form
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (<>
      

    <div className="container mt-4" style={{
    maxWidth: "600px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "8px", 
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
    margin: "20px auto",
  }}>
      <h2 className="mb-4" style={{marginLeft:"27%"}}>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{marginLeft:"38%"}} disabled={loading}>
          {loading ? "Registering..." : "Register User"}
        </button>
      </form>
    </div>
    </>
  );
  
};
