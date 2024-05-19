import React, {useRef} from 'react';
import './index.css';
import {IModal} from "../../Services/Modal";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";
import {toggleMenu} from "./state.ts";

const Modal: React.FC<IModal.Props> = ({children}) => {
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
            <button
                onClick={() => dispatch(toggleMenu())}
                className="md:hidden absolute -left-9999 opacity-0"
                tabIndex={-1}
                style={{pointerEvents: 'none'}}
            >
                Click me
            </button>
            {isOpen && (
                <div
                    onClick={handleOverlayClick}
                    className="modal-wrapper"
                    ref={modalWrapperRef}
                >
                    <div className="modal-content drop-shadow-none w-4/5">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;