import {lazy, Suspense} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "../../App.tsx";
import Loading from "../../Components/Loading";
import Favorites from "../../Components/Favorites.tsx";
import ProtectedRoute from "./ProtectedRoutes.tsx";
import ReviewDetails from "../../Components/Review/Details.tsx";
import OrderSummary from "../../Pages/Order/OrderSummary.tsx";
import OrderStatus from "../../Pages/Order/OrderStatus.tsx";
import OrderHistory from "../../Pages/Order/OrderHistory.tsx";
import OrderDetails from "../../Pages/Order/OrderDetails.tsx";
// import Checkout from "../../Pages/Checkout";

const Home = lazy(() => import('../../Pages/Home'));
const Products = lazy(() => import('../../Pages/Products'));
const ProductDetails = lazy(() => import('../../Pages/ProductDetails'));
const Cart = lazy(() => import('../../Pages/Cart'));
const Login = lazy(() => import('../../Pages/Authentication/Login'));
const Register = lazy(() => import('../../Pages/Authentication/Register/Register'));
const User = lazy(() => import('../../Pages/User'));
const Error = lazy(() => import('../../Pages/Error.tsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error error={undefined}/>,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<Loading/>}>
                        <Home/>
                    </Suspense>
                ),
            },
            {
                path: '/account',
                children: [
                    {
                        path: 'login',
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <Login/>
                            </Suspense>
                        ),
                    },
                    {
                        path: 'register',
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <Register/>
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: '/product',
                children: [
                    {
                        path: 'listing',
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <Products/>
                            </Suspense>
                        ),
                    },
                    {
                        path: '/product/details/:id',
                        element: (
                            <Suspense fallback={<Loading/>}>
                                <ProductDetails/>
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: '/cart',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading/>}>
                            <Cart/>
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: '/settings',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading/>}>
                            <User/>
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: '/favorites',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading/>}>
                            <Favorites/>
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: '/review',
                children: [
                    {
                        path: '/review/details/:id',
                        element: (
                            <ProtectedRoute>
                                <Suspense fallback={<Loading/>}>
                                    <ReviewDetails/>
                                </Suspense>
                            </ProtectedRoute>
                        ),
                    }
                ],
            },
            {
                path: '/order',
                children: [
                    {
                        path: 'summary',
                        element: (
                            <ProtectedRoute>
                                <Suspense fallback={<Loading/>}>
                                    <OrderSummary/>
                                </Suspense>
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'status',
                        element: (
                            <ProtectedRoute>
                                <Suspense fallback={<Loading/>}>
                                    <OrderStatus/>
                                </Suspense>
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'history',
                        element: (
                            <ProtectedRoute>
                                <Suspense fallback={<Loading/>}>
                                    <OrderHistory/>
                                </Suspense>
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: ':id',
                        element: (
                            <ProtectedRoute>
                                <Suspense fallback={<Loading/>}>
                                    <OrderDetails/>
                                </Suspense>
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            // {
            //     path: '/checkout',
            //     element: (
            //         <ProtectedRoute>
            //             <Suspense fallback={<Loading/>}>
            //                 <Checkout/>
            //             </Suspense>
            //         </ProtectedRoute>
            //     ),
            // },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router}/>
}