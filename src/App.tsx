import './App.css';
import "./index.css";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CreateUserPage } from './pages/CreateUserPage';
import { ProfilePage } from './pages/ProfilePage';

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
  return (<>
  <RouterProvider router={router}></RouterProvider>
  </>);
}

export default App
