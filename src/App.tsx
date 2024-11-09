import './App.css'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "./Services/store/slices/user.ts";

function App() {
    const user = useSelector(userSelector);
    console.log(user);

    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>

    )
}

export default App;