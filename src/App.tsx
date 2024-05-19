import './App.css'
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer.tsx";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <div>
            <Navbar/>

            <Outlet/>
            {/*<Products/>*/}
            {/*<ProductDetails></ProductDetails>*/}
            {/*<Register/>*/}
            {/*<ProductDetails/>*/}
            <Footer/>
        </div>

    )
}

export default App