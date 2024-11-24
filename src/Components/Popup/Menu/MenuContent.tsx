import React, {useRef} from 'react';
import './index.css';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {IoSettingsOutline} from 'react-icons/io5';
import {PiHandbagBold} from 'react-icons/pi';
import {CiShop} from 'react-icons/ci';
import Button from '../../Button';
import {MdOutlineFavoriteBorder} from 'react-icons/md';
import {userSelector} from "../../../Services/store/slices/auth.ts";
import {IMenu} from "../../../Services/typings/Menu";

const MenuContent: React.FC<IMenu.Item> = (props) => {
    const {isOpen, setIsOpen, onCloseRequest, logout} = props;
    const user = useSelector(userSelector);
    const modalWrapperRef = useRef<HTMLDivElement | null>(null);


    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalWrapperRef.current && modalWrapperRef.current === e.target) {
            onCloseRequest?.();
        }
    };

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
        onCloseRequest?.();
    }

    const authRender = () => {
        const chunk_one = <>
            <Link
                to="/settings"
                onClick={handleButtonClick}
                className="flex border-b w-full border-gray-300 justify-start py-5 gap-4"
            >
                <IoSettingsOutline className="h-6 w-6"/>
                <p className="text-lg font-semibold">
                    User Settings
                </p>
            </Link>
            <Link
                to="/cart"
                onClick={handleButtonClick}
                className="flex border-b w-full border-gray-300 justify-start py-5 gap-4"
            >
                <PiHandbagBold className="h-6 w-6"/>
                <p className="text-lg font-semibold">
                    Bag
                </p>
            </Link>
            <Link
                to="/order/history"
                onClick={handleButtonClick}
                className="flex border-b w-full border-gray-300 justify-start py-5 gap-4"
            >
                <PiHandbagBold className="h-6 w-6"/>
                <p className="text-lg font-semibold">
                    Order History
                </p>
            </Link>
            <Link
                to="/favorites"
                onClick={handleButtonClick}
                className="flex justify-start py-5 gap-4">
                <MdOutlineFavoriteBorder className="h-6 w-6"/>
                <p className="text-lg font-semibold">
                    Favorites
                </p>
            </Link></>

        const chunk_two = <Link
            to={'/account/login'}
            className="flex flex-col"
            onClick={() => {
                handleButtonClick();
                logout();
            }}
        >
            <Button
                onClick={handleButtonClick}
                text={'Sign Out'}
                shape={'circle'}
                color={'primary'}>
            </Button>
        </Link>

        const unAuthUser = <>
            <div className="flex justify-start text-sm text-neutral-500 py-5 gap-4">
                <p>
                    Join our community to explore your favourite products and great
                    service.{' '}
                    <span className="font-bold underline text-black">Learn more.</span>
                </p>
            </div>
            <div className="flex justify-start py-5 gap-4">
                <Link onClick={handleButtonClick} to="/account/login">
                    <Button text="Login" type="button" size="small" shape="circle"
                            color="primary"/>
                </Link>
                <Link onClick={handleButtonClick} to="/register">
                    <Button text="Sign Up" type="button" size="small" shape="circle"
                            color="secondary"/>
                </Link>
            </div>
        </>

        return {chunk_one, chunk_two, unAuthUser}
    }

    return (
        <>
            {isOpen && (
                <div
                    onClick={handleOverlayClick}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    ref={modalWrapperRef}
                >
                    <div className="modal-content overflow-scroll drop-shadow-none w-4/5">
                        <div className="flex font-montserrat flex-col text-black py-12 px-2 pr-4 h-screen w-full">
                            {
                                (user) ? <p className="text-3xl mb-4">
                                    Hi, <span className="capitalize">{user.username}</span>
                                </p> : null
                            }
                            <Link
                                to="/product/listing"
                                onClick={handleButtonClick}
                                className="flex border-b w-full border-gray-300 justify-start py-5 gap-4"
                            >
                                <CiShop className="h-6 w-6"/>
                                <p
                                    className="font-montserrat text-lg font-semibold">
                                    SHOP
                                </p>
                            </Link>
                            {user && authRender().chunk_one}
                            <Link
                                to="/"
                                onClick={handleButtonClick}
                                className="flex justify-start py-5 gap-4 mb-2">
                                <p className="text-xl font-thin">
                                    Kobutor
                                </p>
                            </Link>
                            {user && authRender().chunk_two}
                            {!user && authRender().unAuthUser}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuContent;