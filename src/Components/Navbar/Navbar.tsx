import {useState} from "react";
import './Navbar.css';
import {Link} from "react-router-dom";
import Modal from "../Modal";
import ModalContent from "../Modal/ModalContent.tsx";
import {CiShop} from "react-icons/ci";
import {PiHandbagBold, PiUserCircleThin} from "react-icons/pi";
import {IoIosSearch} from "react-icons/io";
import {MdOutlineFavoriteBorder} from "react-icons/md";

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
            <div className="flex flex-col">
                <nav className="flex z-50 bg-stone-900 justify-between items-center w-full text-white p-3">
                    <Link to={'/home'}>LOGO</Link>

                    <ul className="hidden items-center md:flex gap-5">
                        <div className="flex gap-3">
                            <CiShop className="text-white h-6 w-6"/>
                            <Link to={'/products/listing'}>SHOP</Link>
                        </div>
                        <div className="h-full w-[1px] py-4 bg-white"></div>
                        <div className="flex gap-3">
                            <PiUserCircleThin className="text-white h-6 w-6"/>
                            <li>SIGN IN</li>
                        </div>
                        {/*<Theme></Theme>*/}
                    </ul>

                    <div
                        className={`flex flex-col justify-center items-center w-7 h-5 gap-2 cursor-pointer md:hidden menu-icon ${menuOpen ? "clicked" : ""}`}
                        onClick={toggleMenu}
                    >
                        <span className="w-full h-[2px] bg-white menu-line transition-transform duration-500"></span>
                        <span className="w-full h-[2px] bg-white menu-line transition-transform duration-500"></span>
                    </div>
                    <Modal toggleModal={toggleMenu} isOpen={isOpen}>
                        <h1 className="text-lg font-bold mb-4">Modal Content</h1>
                        <ModalContent></ModalContent>
                    </Modal>
                </nav>

                <nav className="flex items-center justify-between p-3 px-5 shadow-xl bg-gray-50">
                    <div>KOBUTOR</div>
                    <ul className=" items-center flex gap-8">
                        <div className="flex relative">
                            <IoIosSearch className="absolute bottom-1  text-black h-6 w-6"/>
                            <input
                                className="appearance-none bg-transparent border-b border-black focus:border-amber-200 focus:border-b"/>
                        </div>
                        <MdOutlineFavoriteBorder className="text-rose-500 h-6 w-6"/>
                        <PiHandbagBold className="text-black h-6 w-6"/>
                        {/*<Theme></Theme>*/}
                    </ul>
                </nav>
            </div>

        </>
    )
}

export default Navbar;