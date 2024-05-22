import React, {useRef} from 'react';
import './index.css';
import Theme from "../Theme/Theme.tsx";
import {Link} from "react-router-dom";
import {AppDispatch, RootState} from "../../store.ts";
import {useDispatch, useSelector} from "react-redux";
import {toggleMenu} from "./state.ts";

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
                        <div className="flex justify-center h-screen w-full">
                            <div className="flex justify-center items-center flex-col gap-4 text-black">
                                <Theme></Theme>
                                <Link to={'/product/listing'}>SHOP</Link>
                                <p>Others</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MenuContent;