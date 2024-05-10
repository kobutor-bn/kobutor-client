import './App.css'
import Navbar from "./Components/Navbar/Navbar.tsx";
import Footer from "./Components/Footer.tsx";
import Home from "./Pages/Home";

function App() {
    return (
        <div>
            <Navbar/>
            <Home/>
            {/*<Products/>*/}
            {/*<ProductDetails></ProductDetails>*/}
            {/*<Register/>*/}
            {/*<ProductDetails/>*/}
            <Footer/>
        </div>

    )
}

export default App