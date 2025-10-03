import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './Pages/Home'
import Mens from './Pages/Mens'
import Womens from './Pages/Womens'
import Kids from './Pages/Kids'
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import Footer from './components/Footer'
import SingleProduct from './components/SingleProduct'
import NewCollection from './components/NewCollection'
import AllProducts from "./Pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home/><Footer/></>
  },
  {
    path: "/mens",
    element: <><Navbar/><Mens/><Footer/></>
  },
  {
    path: "/womens",
    element: <><Navbar/><Womens/><Footer/></>
  },
  {
    path: "/kids",
    element: <><Navbar/><Kids/><Footer/></>
  },
  {
    path: "/login",
    element: <><Navbar/><Login/><Footer/></>
  },
  {
    path: "/cart",
    element: <><Navbar/><Cart/><Footer/></>
  },
  {
    path: "/products/:productId",
    element: <><Navbar/><SingleProduct/><Footer/></>
  },
  {
  path: "/new-collection",
  element: <><Navbar/><NewCollection/><Footer/></>
  },
   {
    path: "/products",
    element: <><Navbar/><AllProducts/><Footer/></>
  }
])

const App = () => {
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
