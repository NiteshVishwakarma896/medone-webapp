import React from 'react';
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Products from './pages/Home/Products';
import ProductDetails from './pages/Home/ProductDetails';
import Cart from './pages/Home/Cart';
import Category from './pages/Home/Category';
import User from './pages/User/User';

export default function App (){

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/categories",
      element: <Category />,
    },
    {
      path: "/search/categories/:name",
      element: <Products />,
    },
    {
      path: "/search",
      element: <Products />,
    },
    {
      path: "/product-details",
      element: <ProductDetails />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/account",
      element: <User />,
    },
  ],{
    basename:'/',
  });

  return (
    <RouterProvider router={router} />
  )
}
