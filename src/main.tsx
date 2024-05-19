import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./Pages/Error.tsx";
import Home from "./Pages/Home";
import Products from "./Pages/Products/index.tsx";
import ProductDetails from "./Pages/ProductDetails/index.tsx";
import {Provider} from "react-redux";
import {store} from "./store.ts";
import Cart from "./Pages/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/home",
                element: <Home/>,
            },
            {
                path: "/product",
                children: [
                    {
                        path: "/product/listing",
                        element: <Products/>,
                    },
                    {
                        path: "/product/details",
                        element: <ProductDetails/>,
                    }
                ]
            },
            {
                path: "/cart",
                element: <Cart/>,
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    </Provider>
)