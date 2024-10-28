import React, {useRef} from 'react';
import './index.css';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {IoSettingsOutline} from 'react-icons/io5';
import {PiHandbagBold} from 'react-icons/pi';
import {CiShop} from 'react-icons/ci';
import Button from '../../Button';
import {MdOutlineFavoriteBorder} from 'react-icons/md';
import {AppDispatch, RootState} from '../../../Services/store';
import {closeMenu} from '../../../Services/store/slices/menu';
import {userSelector} from "../../../Services/store/slices/user.ts";

interface MenuContentProps {
    logout: () => void;
}

const MenuContent: React.FC<MenuContentProps> = ({logout}) => {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(userSelector);
    const isMenuOpen = useSelector((state: RootState) => state.menu.isOpen);
    const modalWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalWrapperRef.current && modalWrapperRef.current === e.target) {
            dispatch(closeMenu());
        }
    };

    return (
        <>
            {isMenuOpen && (
                <div
                    onClick={handleOverlayClick}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    ref={modalWrapperRef}
                >
                    <div className="modal-content drop-shadow-none w-4/5">
                        <div className="flex font-montserrat flex-col text-black py-12 px-2 pr-4 h-screen w-full">
                            {
                                (user) ? <p className="text-3xl mb-4">
                                    Hi, <span className="capitalize">{user.username}</span>
                                </p> : null
                            }
                            <Link
                                to="/product/listing"
                                className="flex border-b w-full border-gray-300 justify-start py-5 gap-4"
                            >
                                <CiShop className="h-6 w-6"/>
                                <p onClick={() => dispatch(closeMenu())}
                                   className="font-montserrat text-lg font-semibold">
                                    SHOP
                                </p>
                            </Link>
                            <Link
                                to="/settings"
                                className="flex border-b w-full border-gray-300 justify-start py-5 gap-4"
                            >
                                <IoSettingsOutline className="h-6 w-6"/>
                                <p onClick={() => dispatch(closeMenu())} className="text-lg font-semibold">
                                    User Settings
                                </p>
                            </Link>
                            <Link
                                to="/cart"
                                className="flex border-b w-full border-gray-300 justify-start py-5 gap-4"
                            >
                                <PiHandbagBold className="h-6 w-6"/>
                                <p onClick={() => dispatch(closeMenu())} className="text-lg font-semibold">
                                    Bag
                                </p>
                            </Link>
                            <Link to="/favorites" className="flex justify-start py-5 gap-4">
                                <MdOutlineFavoriteBorder className="h-6 w-6"/>
                                <p onClick={() => dispatch(closeMenu())} className="text-lg font-semibold">
                                    Favorites
                                </p>
                            </Link>
                            <Link to="/" className="flex justify-start py-5 gap-4 mb-2">
                                <p onClick={() => dispatch(closeMenu())} className="text-xl font-thin">
                                    Kobutor
                                </p>
                            </Link>
                            {
                                (user) ?
                                    <Link className="flex flex-col" to={'/login'} onClick={logout}>
                                        <Button onClick={() => dispatch(closeMenu())} text={'Sign Out'} shape={'circle'}
                                                color={'primary'}></Button>
                                    </Link> : null
                            }
                            {!user ? (
                                <>
                                    <div className="flex justify-start text-sm text-neutral-500 py-5 gap-4">
                                        <p>
                                            Join our community to explore your favourite products and great
                                            service.{' '}
                                            <span className="font-bold underline text-black">Learn more.</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-start py-5 gap-4">
                                        <Link onClick={() => dispatch(closeMenu())} to="/login">
                                            <Button text="Login" type="button" size="small" shape="circle"
                                                    color="primary"/>
                                        </Link>
                                        <Link onClick={() => dispatch(closeMenu())} to="/register">
                                            <Button text="Sign Up" type="button" size="small" shape="circle"
                                                    color="secondary"/>
                                        </Link>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuContent;