import Theme from "../Theme/Theme.tsx";
import {useState} from "react";
import './Navbar.css';

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
            <nav className="flex justify-between items-center w-full bg-black text-white p-3">
                <div>Logo</div>
                <ul className="hidden md:flex gap-3">
                    <li>Shop</li>
                    <li>Others</li>
                </ul>
                <ul className="hidden md:flex gap-5">
                    <li>sign in</li>
                    <li>register</li>
                    <Theme></Theme>
                    <div className="menu-icon md:hidden" onClick={toggleMenu}>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;