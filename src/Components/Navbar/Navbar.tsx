import Theme from "../Theme/Theme.tsx";
import {useState} from "react";
import './Navbar.css';
import ModalContent from "../Modal/ModalContent.tsx";
import Modal from "../Modal";
import {Link} from "react-router-dom";

function Navbar() {
    // this one for icon
    const [menuOpen, setMenuOpen] = useState(false);

    // this one is for the modal opening
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);

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
                    <Link to={'/listing'}>Shop</Link>
                    <li>Others</li>
                </ul>
                <ul className="hidden md:flex gap-5">
                    <li>sign in</li>
                    <li>register</li>
                    <Theme></Theme>
                </ul>
                <div className="md:hidden menu-icon z-50">
                    <span className="menu-line"></span>
                    <span className="menu-line"></span>
                    <Modal toggleModal={toggleMenu} isOpen={isOpen}>
                        <h1 className="text-lg font-bold mb-4">Modal Content</h1>
                        <ModalContent></ModalContent>
                    </Modal>
                </div>
            </nav>
        </>
    )
}

export default Navbar;