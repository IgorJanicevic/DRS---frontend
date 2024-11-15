import './App.css';
import "./index.css";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { CreateUserPage } from './pages/CreateUserPage';

const router= createBrowserRouter([
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path: '/register',
    element:<RegisterPage/>
  },
  {
    path: '/',
    element:<HomePage/>
  },
  {
    path:'/create',
    element:<CreateUserPage/>
  }
])


function App() {
  return (<>
  <RouterProvider router={router}></RouterProvider>
  </>);
}

export default App
