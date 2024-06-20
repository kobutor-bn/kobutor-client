import {useRouteError} from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer.tsx";

interface ErrorResponse {
    statusText?: string;
    data?: string;
}

export default function ErrorPage() {
    const error = useRouteError() as ErrorResponse;
    console.error(error);

    return (
        <>
            <Navbar/>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
                    <p className="text-lg mb-4">Sorry, an unexpected error has occurred.</p>
                    <p className="text-sm text-gray-600">
                        <i>{error.statusText || error.data || "Unknown error"}</i>
                    </p>
                </div>
            </div>
            <Footer/>
        </>
    );
}