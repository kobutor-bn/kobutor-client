import './index.css';
import {Link} from "react-router-dom";
import Menu from "../Menu";
import MenuContent from "../Menu/MenuContent.tsx";
import {CiShop} from "react-icons/ci";
import {PiHandbagBold, PiUserCircleGear} from "react-icons/pi";
import {MdOutlineFavoriteBorder} from "react-icons/md";
import SearchBar from "../Searchbar";
import Dropdown from "../Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";
import {toggleMenu, toggleModal} from "../Menu/state.ts";
import ModalContent from "../Menu/ModalContent.tsx";
import {useEffect, useRef, useState} from "react";

function Navbar() {
    const dispatch: AppDispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isMenuOpen = useSelector((state: RootState) => state.menu.isMenuOpen);
    const cart = useSelector((state: RootState) => state.cart);
    const [isDDOpen, setIsDDOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDDOpen(!isDDOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDDOpen(false);
        }
    };

    useEffect(() => {
        if (isDDOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDDOpen]);

    const Button = () => (
        <div className="flex gap-3">
            <PiUserCircleGear className="text-white h-6 w-6"/>
            <li className="cursor-pointer" onClick={toggleDropdown}>Zahin</li>
        </div>
    );

    const Options = () => (
        <>
            {isDDOpen && (
                <div ref={dropdownRef}
                     className="absolute bg-white text-black top-10 right-0 z-50 rounded-md border border-black">
                    <div
                        onClick={toggleDropdown}
                        className="border-b border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                        <p>Wase Zahin</p>
                        <p>w.zahin@yahoo.com</p>
                    </div>
                    <div className="border-b border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100">
                        <Link to={'/settings'} onClick={toggleDropdown}>
                            Settings
                        </Link>
                    </div>
                    <div className="border-b border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100">
                        <Link to={'/login'} onClick={toggleDropdown}>
                            Sign Out
                        </Link>
                    </div>
                </div>
            )}
        </>
    );

    const MenuTrigger = () => (
        <div
            className={`flex flex-col justify-center items-center w-7 h-5 gap-2 cursor-pointer md:hidden menu-icon ${isMenuOpen ? "clicked" : ""}`}
            onClick={() => dispatch(toggleMenu())}
        >
            <span className="w-full h-[2px] bg-white menu-line transition-transform duration-500"></span>
            <span className="w-full h-[2px] bg-white menu-line transition-transform duration-500"></span>
        </div>
    );

    return (
        <div className="w-screen overflow-x-hidden"> {/* Prevent horizontal overflow */}
            <div className="flex flex-col shadow-xl">
                <div className="bg-[#252525]">
                    <nav
                        className="flex z-50 max-w-screen-2xl mx-auto justify-between items-center w-full text-white p-3">
                        <Link to={"/home"}>LOGO</Link>
                        <ul className="hidden items-center md:flex gap-5">
                            <div className="flex gap-3">
                                <CiShop className="text-white h-6 w-6"/>
                                <Link to={'/product/listing'}>SHOP</Link>
                            </div>
                            <div className="h-full w-[1px] py-4 bg-white"></div>
                            {isLoggedIn ?
                                <Dropdown
                                    btn={<Button/>}
                                    body={<Options/>}
                                    isOpen={isDDOpen}/>
                                :
                                <Link className="flex gap-3" to={'/login'}>
                                    <PiUserCircleGear className="text-white h-6 w-6"/>
                                    <li onClick={toggleDropdown}>SIGN IN</li>
                                </Link>
                            }
                        </ul>
                        <Menu trigger={<MenuTrigger/>} body={<MenuContent/>}>
                        </Menu>
                    </nav>
                </div>
                <div className="bg-white">
                    <nav className="flex items-center w-full max-w-screen-2xl mx-auto justify-between p-3">
                        <div className="font-bold text-lg">KOBUTOR</div>
                        <ul className="flex items-center md:gap-8 gap-3">
                            <div className="hidden md:flex">
                                <SearchBar/>
                            </div>
                            <Menu
                                trigger={<MdOutlineFavoriteBorder onClick={() => dispatch(toggleModal())}
                                                                  className="text-rose-500 h-7 w-7"/>}
                                body={<ModalContent content={<p>Your content goes here !!!</p>}/>}>
                            </Menu>
                            <Link to={"/cart"}>
                                <div className="relative">
                                    <PiHandbagBold className="text-black h-7 w-7 bag-icon"/>
                                    <span
                                        className="absolute bottom-0.5 left-1 text-xs font-bold text-red-900 rounded-full w-5 h-5 flex items-center justify-center bag-count">{cart.qty}</span>
                                </div>
                            </Link>
                        </ul>
                    </nav>
                </div>
            </div>
            <p className="text-center py-5 bg-yellow-100 shadow-lg">
                Free Delivery, Member Exclusive Products and Promos for all our Members. <br/>
                <span className="underline font-bold">Join us!</span>
            </p>
        </div>
    );
}

export default Navbar;