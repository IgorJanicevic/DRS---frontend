import './App.css';
import './index.css';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CreateUserPage } from './pages/CreateUserPage';
import { ProfilePage } from './pages/ProfilePage';
import { jwtDecode } from 'jwt-decode';
import { AdminHomePage } from './pages/AdminHomePage';
import {
  ProtectedRouteForCommon,
  CustomJwtPayload,
  ProtectedRouteForAdmin,
} from './components/ProtectRoutes';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { SearchedUsers } from "./pages/SearchedUsers";
import React from 'react';
import { SocketProvider, useSocket } from './socket';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <ProtectedRouteForCommon />,
    children: [{ path: '/', element: <HomePage /> }],
  },
  { path: '/create', element: <CreateUserPage /> },
  { path: '/privacy-policy', element: <PrivacyPolicyPage /> },
  {
    path: '/profile/:userId', 
    element: <ProtectedRouteForCommon />, 
    children: [
      {
        path: '', 
        element: <ProfilePage />
      }
    ]
  },  
  {
    path: '/admin',
    element: <ProtectedRouteForAdmin />,
    children: [{ path: '/admin', element: <AdminHomePage /> }],
  },
  {
    path: "/search-results",
    element: <SearchedUsers />,
  }
]);

function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      const exp = decodedToken?.exp;
      if (exp && Date.now() > exp * 1000) {
        localStorage.clear();
        console.log('Token has expired. LocalStorage cleared.');
      }
    }   

  }, []);

  return (
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  );
}

export default App;
