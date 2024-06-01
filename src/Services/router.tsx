import {lazy, Suspense} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "../App.tsx";
import ErrorPage from "../Pages/Error.tsx";

const Home = lazy(() => import('../Pages/Home'));
const Products = lazy(() => import('../Pages/Products/index.tsx'));
const ProductDetails = lazy(() => import('../Pages/ProductDetails/index.tsx'));
const Cart = lazy(() => import('../Pages/Cart'));
const Login = lazy(() => import('../Pages/Authentication/Login'));
const Register = lazy(() => import('../Pages/Authentication/Register/Register.tsx'));
const User = lazy(() => import('../Pages/User'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/login',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Login/>
                    </Suspense>
                ),
            },
            {
                path: '/register',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Register/>
                    </Suspense>
                ),
            },
            {
                path: '/home',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home/>
                    </Suspense>
                ),
            },
            {
                path: '/product',
                children: [
                    {
                        path: '/product/listing',
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <Products/>
                            </Suspense>
                        ),
                    },
                    {
                        path: '/product/details/:id',
                        element: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <ProductDetails/>
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: '/cart',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Cart/>
                    </Suspense>
                ),
            },
            {
                path: '/settings',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <User/>
                    </Suspense>
                ),
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router}/>
}