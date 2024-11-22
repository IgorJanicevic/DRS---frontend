import { jwtDecode, JwtPayload } from 'jwt-decode';
import { NavLink, useNavigate } from 'react-router-dom';
import "../assets/Navbar.css";

export interface CustomJwtPayload extends JwtPayload {
    role: string;
    sub: string;
}

export const Navbar = () => {
    const navigate = useNavigate();

    let userRole = null;
    const token = localStorage.getItem('token'); 

    if (token) {
        const decodedToken = jwtDecode<CustomJwtPayload>(token); 
        userRole = decodedToken.role; 
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const token = localStorage.getItem('token');
        if (!token) {
            e.preventDefault(); 
            navigate('/login');
        }
    };

    return (<>
    
        <nav className="navbar">
            <div className="navbar-left">
                <NavLink to="/info" onClick={handleLinkClick}>Logo</NavLink>
                <input type='text' placeholder='Search'></input>
                <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                <NavLink to="/friends" onClick={handleLinkClick} className={({ isActive }) => (isActive ? 'active' : '')}>Friends</NavLink>
                
            </div>
            <div className="navbar-left">
            {userRole === "admin" && (
                <div className="dropdown">
                <button className="dropdown-button">Admin</button>
                <div className="dropdown-content">
                    <NavLink
                    to="/create"
                    onClick={handleLinkClick}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    >
                    Create user
                    </NavLink>
                    <NavLink
                    to="/pending"
                    onClick={handleLinkClick}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    >
                    Pending posts
                    </NavLink>
                    <NavLink
                    to="/blocked"
                    onClick={handleLinkClick}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    >
                    Blocked users
                    </NavLink>
                </div>
                </div>
            )}

            
            <div className='dropdown'>
                <div className='dropdown-button-profile'>👤</div>
                <div className='dropdown-content'>
                    <NavLink to="/profile" onClick={handleLinkClick}>Profile</NavLink>
                    {token !== null && <button onClick={handleLogout}>Logout</button>}
                    {token === null && <button onClick={handleLogout}>Login</button>}
                </div>
            </div>
            
            </div>

        </nav>
        </>
    );
};
