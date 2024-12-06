import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/Navbar.css";
import { CustomJwtPayload } from "./ProtectRoutes";
import { Notifications } from "./Notifications";
import { useState } from "react";
import React from "react";



export const Navbar = () => {
  const navigate = useNavigate();
  const [inputSearch,setInputSearch] = useState('');
  let userRole = "";
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode<CustomJwtPayload>(token); // Dekodiranje tokena
    userRole = decodedToken.role; // Dobavljanje role korisnika
  }

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const token = localStorage.getItem("token");
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputSearch.trim()) {
      navigate(`/search-results?query=${inputSearch.trim()}`);
    }
  };
  

  return (
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src="https://media-cdn.incrowdsports.com/23610a1b-1c2e-4d2a-8fe4-ac2f8e400632.svg"
            alt="Logo"
            className="navbar-logo"
            onClick={handleLogoClick}
          />
          <form onSubmit={handleSearchSubmit} className="navbar-search-form">
            <input
              type="text"
              placeholder="Search"
              className="users-search"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
          </form>
          <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
          <NavLink to="/friends" onClick={handleLinkClick} className={({ isActive }) => (isActive ? "active" : "")}>Friends</NavLink>
        </div>

        <div className="navbar-right">
          <Notifications />
          <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" htmlFor="menu__toggle">
              <span></span>
              <span></span>
              <span></span>
            </label>
            <ul className="menu__box">
              <li>
                <NavLink className="menu__item" to="/profile" onClick={handleLinkClick}>Profile</NavLink>
              </li>
              <li>
                <NavLink className="menu__item" to="/settings" onClick={handleLinkClick}>Settings</NavLink>
              </li>
              <li>
                <NavLink className="menu__item" to="/login" onClick={handleLogout}>Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
};
