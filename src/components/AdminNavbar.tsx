import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/AdminNavbar.css"



export const AdminNavbar = ({ onSelect }: { onSelect: (page: string) => void }) => {
  const [selected,setSelected] = useState<string>('Register');
	const navigate = useNavigate();
	const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


  return (
	
    <aside id="colorlib-aside" role="complementary">

      <nav id="colorlib-main-menu" role="navigation">
        <ul style={{padding:"20px"}}>
           <li>
           <NavLink to="#"  onClick={()=>{onSelect("Register");setSelected('Register')}} className={selected==='Register' ? 'clicked' : ''}>
           Register
            </NavLink>
          </li>
          <li>
          <NavLink to="#"  onClick={()=>{onSelect("Posts");setSelected('Posts')}} className={selected==='Posts' ? 'clicked' : ''}>
          Posts
            </NavLink>
          </li>
          <li>
          <NavLink to="#"  onClick={()=>{onSelect("Blocked");setSelected('Blocked')}} className={selected==='Blocked' ? 'clicked' : ''}>
          Blocked
            </NavLink>
          </li>
          <li>
            <NavLink to="#"  onClick={()=>{onSelect("Profile");setSelected('Profile')}} className={selected==='Profile' ? 'clicked' : ''}>
              Profile
            </NavLink>
          </li>
		  <li>
			<NavLink onClick={handleLogout} to={"/login"} style={{marginTop:"60vh"}}>
			Logout
			</NavLink>
		  </li>
        </ul>
		
      </nav>
    </aside>
  );
};

export default AdminNavbar;
