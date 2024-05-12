import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./Pages/Error.tsx";
import Home from "./Pages/Home";
import Products from "./Pages/Products/index.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/home",
                element: <Home/>,
            }
        ],
    },
    {
        path: "/listing",
        element: <Products/>,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)