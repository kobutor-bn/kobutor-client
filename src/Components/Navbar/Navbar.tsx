import Theme from "../Theme/Theme.tsx";
import {useState} from "react";
import './Navbar.css';
import DDMenu from "../Modal/DDMenu.tsx";
import Modal from "../Modal";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        const menuIcon = document.querySelector('.menu-icon');
        // @ts-expect-error because js can't detect if it's a valid html selector
        menuIcon.classList.toggle('clicked');
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <nav className="flex z-50 justify-between items-center w-full bg-black text-white p-3">
                <div>Logo</div>
                <ul className="hidden md:flex gap-3">
                    <li>Shop</li>
                    <li>Others</li>
                </ul>
                <ul className="hidden md:flex gap-5">
                    <li>sign in</li>
                    <li>register</li>
                    <Theme></Theme>
                </ul>
                <div className="md:hidden menu-icon z-50" onClick={toggleMenu}>
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <Modal>
                        <h1 className="text-lg font-bold mb-4">Modal Content</h1>
                        <DDMenu></DDMenu>
                    </Modal>
                </div>
            </nav>
        </>
    )
}

export default Navbar;