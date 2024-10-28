import './App.css'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer.tsx";
import {Outlet} from "react-router-dom";
import {useGetUserQuery} from "./Services/store/apiSlice.ts";

function App() {
    useGetUserQuery();
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>

    )
}

export default App