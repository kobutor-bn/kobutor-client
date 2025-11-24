import {Link, useNavigate} from "react-router-dom";
import Menu from "../Popup/Menu";
import {CiShop} from "react-icons/ci";
import {PiHandbagBold, PiUserCircleGear} from "react-icons/pi";
import {MdOutlineFavoriteBorder} from "react-icons/md";
import {HiOutlineShieldCheck} from "react-icons/hi";
import {TbTruckDelivery} from "react-icons/tb";
import {BiSupport} from "react-icons/bi";
import SearchBar from "../Searchbar";
import Dropdown from "../Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import Modal from "../Popup/Modal";
import LoginPrompt from "../Popup/Modal/LoginPrompt.tsx";
import "./index.css";
import {logout, userSelector} from "../../Services/store/slices/auth.ts";
import {useGlobal} from "../../GlobalProvider.tsx";
import {LiaSpinnerSolid} from "react-icons/lia";
import {cartSelector} from "../../Services/store/slices/cart.ts";

function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const cart = useSelector(cartSelector);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDDOpen, setIsDDOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const {userCtx, cartCtx} = useGlobal();

    // Sticky navbar on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = () => setIsDDOpen(!isDDOpen);

    const accLogout = async () => {
        setIsDDOpen(false);
        dispatch(logout());
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
        <div className="flex gap-2 items-center hover:opacity-80 transition-opacity">
            <PiUserCircleGear className="text-white h-6 w-6 2xl:h-10 2xl:w-10"/>
            <li className="cursor-pointer capitalize text-sm 2xl:text-2xl">{user?.username || user?.name}</li>
        </div>
    );

    const Options = () => (
        <>
            {isDDOpen && (
                <div ref={dropdownRef}
                     className="absolute bg-white text-black top-12 right-0 z-50 rounded-lg shadow-xl border border-gray-200 min-w-[220px] 2xl:min-w-[300px]">
                    <div
                        onClick={toggleDropdown}
                        className="border-b border-gray-200 px-5 py-3 hover:bg-gray-50 transition-colors"
                    >
                        <p className="font-semibold text-sm 2xl:text-xl">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 2xl:text-lg truncate">{user?.email || ''}</p>
                    </div>
                    <Link to={'/order/history'} onClick={toggleDropdown}>
                        <div className="px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors text-sm 2xl:text-xl">
                            My Orders
                        </div>
                    </Link>
                    <Link to={'/settings'} onClick={toggleDropdown}>
                        <div className="px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors text-sm 2xl:text-xl">
                            Account Settings
                        </div>
                    </Link>
                    <div onClick={accLogout}
                         className="px-5 py-3 cursor-pointer hover:bg-red-50 transition-colors text-red-600 font-medium rounded-b-lg text-sm 2xl:text-xl">
                        Sign Out
                    </div>
                </div>
            )}
        </>
    );

    const showPromo = () => {
        if (userCtx.isUserLoading)
            return (
                <div className="font-montserrat text-center text-sm md:text-base 2xl:text-2xl py-3 px-3 bg-amber-50 border-b border-amber-100">
                    <div className="flex items-center justify-center gap-2">
                        <LiaSpinnerSolid className="animate-spin"/>
                        <span>Loading your personalized offers...</span>
                    </div>
                </div>
            );

        switch (userCtx.isAuthenticated) {
            case true:
                return (
                    <div className="font-montserrat text-center text-sm md:text-base 2xl:text-2xl py-3 px-3 bg-green-50 border-b border-green-100">
                        Welcome back, <span className="capitalize font-semibold">{user?.name || 'Member'}</span>! 🎉 Enjoy exclusive member benefits.
                    </div>
                );
            case false:
                return (
                    <div className="font-montserrat text-center text-sm md:text-base 2xl:text-2xl py-3 px-3 bg-blue-50 border-b border-blue-100">
                        <span className="font-medium">Free Delivery</span> on orders over €50 |
                        <Link to={'/account/register'} className="ml-1 underline font-bold text-blue-600 hover:text-blue-800">
                            Join Now
                        </Link> for exclusive member benefits
                    </div>
                );
            default:
                return null;
        }
    };

    const cartIcon = () => {
        if (userCtx.isUserLoading || cartCtx.isCartLoading)
            return <LiaSpinnerSolid className="animate-spin h-6 w-6 2xl:h-10 2xl:w-10"/>;

        switch (userCtx.isAuthenticated) {
            case true:
                return (
                    <Link to={"/cart"} className="relative group">
                        <PiHandbagBold className="text-black h-6 w-6 2xl:h-10 2xl:w-10 group-hover:text-blue-600 transition-colors"/>
                        {cart && cart.quantity > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center 2xl:h-8 2xl:w-8 2xl:text-base">
                                {cart.quantity > 99 ? '99+' : cart.quantity}
                            </span>
                        )}
                    </Link>
                );
            case false:
                return (
                    <Modal
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                        trigger={
                            <PiHandbagBold className="text-black cursor-pointer h-6 w-6 2xl:h-10 2xl:w-10 hover:text-blue-600 transition-colors"/>
                        }
                        body={<LoginPrompt isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>}
                    />
                );
            default:
                return null;
        }
    };

    const status = () => {
        if (userCtx.isUserLoading) return <LiaSpinnerSolid className="animate-spin"/>;

        switch (userCtx.isAuthenticated) {
            case true:
                return <Dropdown btn={<Button/>} body={<Options/>} isOpen={isDDOpen}/>;
            case false:
                return (
                    <Link className="flex gap-2 items-center hover:opacity-80 transition-opacity" to={'/account/login'}>
                        <PiUserCircleGear className="text-white h-6 w-6 2xl:h-10 2xl:w-10"/>
                        <li className="text-sm 2xl:text-2xl">SIGN IN</li>
                    </Link>
                );
            default:
                return null;
        }
    };

    const favIcon = () => {
        if (userCtx.isUserLoading) return <LiaSpinnerSolid className="animate-spin"/>;

        switch (userCtx.isAuthenticated) {
            case true:
                return (
                    <Link to={'/favorites'} className="group">
                        <MdOutlineFavoriteBorder className="text-rose-500 h-6 w-6 2xl:h-10 2xl:w-10 group-hover:text-rose-600 transition-colors"/>
                    </Link>
                );
            case false:
                return (
                    <Modal
                        trigger={
                            <MdOutlineFavoriteBorder className="cursor-pointer text-rose-500 h-6 w-6 2xl:h-10 2xl:w-10 hover:text-rose-600 transition-colors"/>
                        }
                        body={<LoginPrompt isOpen={isModalOpen} setIsOpen={setIsModalOpen}/>}
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={`w-full fixed top-0 left-0 z-50 transition-shadow ${isScrolled ? 'shadow-lg' : ''}`}>
            {/* Top Trust Bar */}
            <div className="hidden md:block bg-gray-900 text-white text-xs 2xl:text-lg py-2">
                <div className="max-w-screen-2xl mx-auto px-4 flex justify-center items-center gap-8">
                    <div className="flex items-center gap-2">
                        <HiOutlineShieldCheck className="h-4 w-4 2xl:h-6 2xl:w-6"/>
                        <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TbTruckDelivery className="h-4 w-4 2xl:h-6 2xl:w-6"/>
                        <span>Free EU Shipping Over €50</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BiSupport className="h-4 w-4 2xl:h-6 2xl:w-6"/>
                        <span>24/7 Customer Support</span>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="flex flex-col bg-white">
                <div className="bg-[#252525]">
                    <nav className="flex font-montserrat max-w-screen-2xl mx-auto justify-between items-center w-full text-white p-4 2xl:p-8">
                        <Link to={'/'} className="text-xl 2xl:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                            KOBUTOR
                        </Link>
                        <ul className="hidden items-center md:flex gap-6 2xl:gap-10">
                            <Link to={'/product/listing'} className="flex gap-2 items-center hover:opacity-80 transition-opacity">
                                <CiShop className="text-white h-6 w-6 2xl:h-10 2xl:w-10"/>
                                <span className="text-sm 2xl:text-2xl">SHOP</span>
                            </Link>
                            <div className="h-6 w-[1px] bg-white/30"></div>
                            {status()}
                        </ul>
                        <Menu
                            trigger={
                                <div
                                    className={`flex flex-col justify-center items-center w-7 h-5 gap-1.5 cursor-pointer md:hidden menu-icon ${isMenuOpen ? "clicked" : ""}`}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    <div className="menu-line w-full h-0.5 bg-white transition-all"></div>
                                    <div className="menu-line w-full h-0.5 bg-white transition-all"></div>
                                </div>
                            }
                            logout={accLogout}
                            isOpen={isMenuOpen}
                            setIsOpen={setIsMenuOpen}
                        />
                    </nav>
                </div>

                {/* Secondary Nav */}
                <div className="bg-white border-b border-gray-200">
                    <nav className="flex items-center w-full max-w-screen-2xl mx-auto justify-between p-4 2xl:p-6">
                        <Link to={'/'} className="font-montserrat font-bold text-2xl 2xl:text-4xl text-blue-600 hover:text-blue-700 transition-colors">
                            KOBUTOR
                        </Link>
                        <ul className="flex items-center md:gap-6 gap-4">
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