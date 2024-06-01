import React, {useRef} from 'react';
import './index.css';
import {Link} from "react-router-dom";
import {AppDispatch, RootState} from "../../store.ts";
import {useDispatch, useSelector} from "react-redux";
import {toggleMenu} from "./state.ts";
import {IoSettingsOutline} from "react-icons/io5";
import {PiHandbagBold} from "react-icons/pi";
import {CiShop} from "react-icons/ci";
import Button from "../Button.tsx";
import {MdOutlineFavoriteBorder} from "react-icons/md";

const MenuContent: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.menu.isOpen);
    const modalWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalWrapperRef.current && modalWrapperRef.current === e.target) {
            dispatch(toggleMenu());
            const menuIcon = document.querySelector('.menu-icon');
            if (menuIcon) {
                menuIcon.classList.remove('clicked');
            }
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={handleOverlayClick}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    ref={modalWrapperRef}
                >
                    <div className="modal-content drop-shadow-none w-4/5">
                        <div className="flex h-screen w-full">
                            <div className="flex flex-col py-12 px-2 text-black">
                                <Link to={'/product/listing'}
                                      className="flex border-b w-full border-gray-300 justify-start py-5 gap-4">
                                    <CiShop className="h-6 w-6"></CiShop>
                                    <p onClick={() => dispatch(toggleMenu())} className="text-lg font-semibold"
                                    >SHOP</p>
                                </Link>
                                <Link to={'/settings'}
                                      className="flex border-b w-full border-gray-300 justify-start py-5 gap-4">
                                    <IoSettingsOutline className="h-6 w-6"></IoSettingsOutline>
                                    <p onClick={() => dispatch(toggleMenu())} className="text-lg font-semibold">User
                                        Settings</p>
                                </Link>
                                <Link to={'/cart'}
                                      className="flex border-b w-full border-gray-300 justify-start py-5 gap-4">
                                    <PiHandbagBold className="h-6 w-6"></PiHandbagBold>
                                    <p onClick={() => dispatch(toggleMenu())} className="text-lg font-semibold">Bag</p>
                                </Link>
                                <Link to={'/cart'} className="flex justify-start py-5 gap-4">
                                    <MdOutlineFavoriteBorder className="h-6 w-6"></MdOutlineFavoriteBorder>
                                    <p onClick={() => dispatch(toggleMenu())} className="text-lg font-semibold"
                                    >Favorites</p>
                                </Link>
                                <Link to={'/home'} className="flex justify-start py-5 gap-4">
                                    {/*<PiHandbagBold className="h-6 w-6"></PiHandbagBold>*/}
                                    <p onClick={() => dispatch(toggleMenu())} className="text-xl font-thin"
                                    >Kobutor</p>
                                </Link>
                                <div className="flex justify-start text-sm text-neutral-500 py-5 gap-4">
                                    <p>Join our community to explore the your favourite products and great
                                        service. <span className="font-bold underline text-black">Learn more.</span></p>
                                </div>
                                <div className="flex justify-start py-5 gap-4">
                                    <Link onClick={() => dispatch(toggleMenu())} to={'/login'}>
                                        <Button text="Login" type="button" size="small" shape="circle"
                                                color="primary"></Button>
                                    </Link>
                                    <Link onClick={() => dispatch(toggleMenu())} to={'/register'}>
                                        <Button text="Sign Up" type="button" size="small" shape="circle"
                                                color="secondary"></Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuContent;