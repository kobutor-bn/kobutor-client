import './App.css'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import {Outlet} from "react-router-dom";
import CookieConsent from "./Components/CookieConsent";

function App() {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
            <CookieConsent/>
        </>

    )
}

export default App;