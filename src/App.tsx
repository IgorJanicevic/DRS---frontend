import './App.css';
import "./index.css";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CreateUserPage } from './pages/CreateUserPage';
import { ProfilePage } from './pages/ProfilePage';
import { jwtDecode } from 'jwt-decode';
import { AdminHomePage } from './pages/AdminHomePage';
import { ProtectedRouteForCommon, CustomJwtPayload, ProtectedRouteForAdmin } from './components/ProtectRoutes';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

const router= createBrowserRouter([
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path: '/',
    element:<ProtectedRouteForCommon/>,
    children: [{ path: "/", element: <HomePage /> }]
  },
  {
    path:'/create',
    element:<CreateUserPage/>
  },
  {
    path:'/privacy-policy',
    element:<PrivacyPolicyPage/>
  },
  {
    path:'/profile',
    element:<ProtectedRouteForCommon/>,
    children: [{ path: "/profile", element: <ProfilePage /> }],

  },
  {
    path: "/admin",
    element: <ProtectedRouteForAdmin />,
    children: [{ path: "/admin", element: <AdminHomePage /> }],
  },
])


function App() {
  const token = localStorage.getItem('token'); 

    if (token) {
        const decodedToken = jwtDecode<CustomJwtPayload>(token); 
        const exp = decodedToken.exp; 

        if (exp) {
          const expirationTime = exp * 1000;
    
          const currentTime = Date.now();
    
          if (currentTime > expirationTime) {
            localStorage.clear();
            console.log("Token has expired. LocalStorage cleared.");
          } else {
            console.log("Token is still valid.");
          }
        }
    }
  return (<>
  <RouterProvider router={router}></RouterProvider>
  </>);
}

export default App
