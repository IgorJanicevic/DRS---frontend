import './App.css';
import "./index.css";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CreateUserPage } from './pages/CreateUserPage';
import { ProfilePage } from './pages/ProfilePage';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from './components/Navbar';


const router= createBrowserRouter([
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path: '/',
    element:<HomePage/>
  },
  {
    path:'/create',
    element:<CreateUserPage/>
  },
  {
    path:'/profile',
    element:<ProfilePage/>
  }
])


function App() {
  const token = localStorage.getItem('token'); 

    if (token) {
        const decodedToken = jwtDecode<CustomJwtPayload>(token); 
        const exp = decodedToken.exp; 

        if(exp){
          localStorage.clear()
        }
    }
  return (<>
  <RouterProvider router={router}></RouterProvider>
  </>);
}

export default App
