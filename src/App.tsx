import './App.css'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import {Outlet} from "react-router-dom";

function App() {
    const v = import.meta.env.VITE_API_BACKEND_BASE_URL
    console.log(v);
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>

    )
}

export default App;