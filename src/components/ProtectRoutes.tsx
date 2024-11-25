import { Navigate, Outlet, replace } from "react-router-dom";
import { jwtDecode, JwtPayload } from 'jwt-decode';


export interface CustomJwtPayload extends JwtPayload {
    role: string;
    sub: string;
}


const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token!=null; 
};

const isAuthenticatedAsRole = (role:string)=> {
  const decodedToken = DecodeToken();
  return decodedToken?.role===role;
}

export const DecodeToken = (): CustomJwtPayload | undefined => {
  const token = localStorage.getItem('token');
  if (!token) {
      return undefined; 
  }
  try {
      return jwtDecode<CustomJwtPayload>(token);
  } catch (error) {
      console.error("Failed to decode token:", error);
      return undefined; 
  }
};

export const Authenticated=()=>{
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}

export const ProtectedRouteForAdmin = () => {
  return isAuthenticatedAsRole('admin') ? <Outlet /> : <Navigate to="/login" replace />;
};

export const ProtectedRouteForCommon = () => {
  return isAuthenticatedAsRole('common') ? <Outlet /> : <Navigate to="/login" replace/>;
}


