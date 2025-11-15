import {Link, useNavigate} from "react-router-dom";
import Menu from "../Popup/Menu";
import {CiShop} from "react-icons/ci";
import {PiHandbagBold, PiUserCircleGear} from "react-icons/pi";
import {MdOutlineFavoriteBorder} from "react-icons/md";
import SearchBar from "../Searchbar";
import Dropdown from "../Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import Modal from "../Popup/Modal";
import LoginPrompt from "../Popup/Modal/LoginPrompt.tsx";
import "./index.css";
import {logout, userSelector} from "../../Services/store/slices/auth.ts";
import {useGlobal} from "../../GlobalProvider.tsx";
import Loading from "../Loading";
import {LiaSpinnerSolid} from "react-icons/lia";
import {cartSelector} from "../../Services/store/slices/cart.ts";

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const cart = useSelector(cartSelector);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDDOpen, setIsDDOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const {userCtx, cartCtx} = useGlobal();

    const toggleDropdown = () => setIsDDOpen(!isDDOpen);

    const accLogout = async () => {
        setIsDDOpen(false);
        dispatch(logout());
        console.log(user)
        if (!localStorage.getItem("access_token")) {
            navigate('/account/login');
        }
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
        <div className="flex gap-3 items-center">
            <PiUserCircleGear className="text-white h-6 w-6 2xl:h-10 2xl:w-10"/>
            <li className="cursor-pointer capitalize" onClick={toggleDropdown}>{user?.username}</li>
        </div>
    );

    const Options = () => (
        <>
            {isDDOpen && (
                <div ref={dropdownRef}
                     className="absolute bg-white text-black top-10 right-0 z-50 rounded-md border border-black">
                    <div
                        onClick={toggleDropdown}
                        className="border-b border-gray-300 px-4 py-2 hover:bg-gray-100"
                    >
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                    </div>
                    <Link to={'/settings'} onClick={toggleDropdown}>
                        <div className="border-b border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100">
                            Settings
                        </div>
                    </Link>
                    <div onClick={accLogout}
                         className="border-b border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100">
                        Sign Out
                    </div>
                </div>
            )}
        </>
    );

    // const MenuTrigger = () => (
    //     <div
    //         className={`flex flex-col justify-center items-center w-7 h-5 gap-2 cursor-pointer md:hidden menu-icon ${isMenuOpen ? "clicked" : ""}`}
    //         onClick={() => setIsMenuOpen(!isMenuOpen)}
    //     >
    //         <div className="menu-line w-full h-0.5 bg-white"></div>
    //         <div className="menu-line w-full h-0.5 bg-white"></div>
    //     </div>
    // );

    const showPromo = () => {
        if (userCtx.isUserLoading)
            return <p className="font-montserrat text-center 2xl:text-3xl py-5 px-1.5 bg-[#FFB347] shadow-lg">
                Just a moment! We're preparing your exclusive member deals...</p>
        switch (userCtx.isAuthenticated) {
            case true:
                return <p className="font-montserrat text-center 2xl:text-3xl py-5 px-1.5 bg-green-100 shadow-lg">
                    Welcome back, <span className="capitalize">{user?.name}</span>! Enjoy your exclusive member
                    benefits and promotions.
                </p>
            case false:
                return <p className="font-montserrat text-center 2xl:text-3xl py-5 bg-yellow-100 shadow-lg">
                    Free Delivery, Member Exclusive Products and Promos for all our Members. <br/>
                    <Link to={'/register'}>
                        <span className="underline font-bold">Join us!</span>
                    </Link>
                </p>
        }
    }

    const cartIcon = () => {
        if (userCtx.isUserLoading || cartCtx.isCartLoading) return <LiaSpinnerSolid/>
        switch (userCtx.isAuthenticated) {
            case true:
                return <Link to={"/cart"}>
                    <div className="relative">
                        <PiHandbagBold className="text-black h-7 w-7 2xl:h-12 2xl:w-12 bag-icon"/>
                        <span
                            className="absolute bottom-0.5 left-1 text-xs font-bold text-red-900 rounded-full w-5 h-5 flex
                             items-center justify-center bag-count 2xl:h-12 2xl:w-12 2xl:text-xl 2xl:left-0 2xl:top-1">
                                            {cart?.quantity}
                        </span>
                    </div>
                </Link>
            case false:
                return <Modal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    trigger={
                        <PiHandbagBold
                            className="text-black cursor-pointer h-7 w-7 2xl:h-12 2xl:w-12 bag-icon"/>}
                    body={
                        <LoginPrompt isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>}
                />
        }
    }

    const status = () => {
        if (userCtx.isUserLoading) return <Loading/>
        switch (userCtx.isAuthenticated) {
            case true:
                return <Dropdown
                    btn={<Button/>}
                    body={<Options/>}
                    isOpen={isDDOpen}
                />
            case false:
                return <Link className="flex gap-3 items-center" to={'/account/login'}>
                    <PiUserCircleGear className="text-white h-6 w-6 2xl:h-10 2xl:w-10"/>
                    <li onClick={toggleDropdown}>SIGN IN</li>
                </Link>
        }
    }

    const favIcon = () => {
        if (userCtx.isUserLoading) return <LiaSpinnerSolid/>
        switch (userCtx.isAuthenticated) {
            case true:
                return <Link to={'/favorites'}>
                    <MdOutlineFavoriteBorder className="text-rose-500 h-7 w-7 2xl:h-12 2xl:w-12"/>
                </Link>
            case false:
                return <Modal
                    trigger={<MdOutlineFavoriteBorder
                        className="cursor-pointer text-rose-500 h-7 w-7 2xl:h-12 2xl:w-12"/>}
                    body={
                        <LoginPrompt isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                />
        }
    }

    return (
        <div className="w-screen">
            <div className="flex flex-col shadow-xl">
                <div className="bg-[#252525]">
                    <nav
                        className="flex font-montserrat z-50 max-w-screen-2xl mx-auto justify-between items-center w-full text-white p-3 2xl:p-9 2xl:text-3xl">
                        <Link to={'/'}>LOGO</Link>
                        <ul className="hidden items-center md:flex gap-5">
                            <div className="flex gap-3 items-center">
                                <CiShop className="text-white h-6 w-6 2xl:h-10 2xl:w-10"/>
                                <Link to={'/product/listing'}>SHOP</Link>
                            </div>
                            <div className="h-full w-[1px] py-4 bg-white"></div>
                            {status()}
                        </ul>
                        <Menu
                            trigger={<div
                                className={`flex flex-col justify-center items-center w-7 h-5 gap-2 cursor-pointer md:hidden menu-icon ${isMenuOpen ? "clicked" : ""}`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <div className="menu-line w-full h-0.5 bg-white"></div>
                                <div className="menu-line w-full h-0.5 bg-white"></div>
                            </div>}
                            logout={accLogout}
                            isOpen={isMenuOpen}
                            setIsOpen={setIsMenuOpen}
                        />
                    </nav>
                </div>

                <div className="bg-white">
                    <nav
                        className="flex items-center w-full max-w-screen-2xl mx-auto justify-between p-3 2xl:p-6 2xl:text-3xl">
                        <div className="font-montserrat font-semibold text-lg 2xl:text-3xl">KOBUTOR</div>
                        <ul className="flex items-center md:gap-8 gap-3">
                            <div className="hidden md:flex">
                                <SearchBar/>
                            </div>
                            {favIcon()}
                            {cartIcon()}
                        </ul>
                    </nav>
                </div>
            </div>
            {showPromo()}
        </div>
    );
}

export default Navbar;