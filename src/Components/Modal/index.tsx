import React, {useState} from 'react';
import './index.css';

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);

    };

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if ((e.target as HTMLDivElement).classList.contains('modal-wrapper')) {
            toggleModal();
            const menuIcon = document.querySelector('.menu-icon');
            // @ts-expect-error because js can't detect if it's a valid html selector
            menuIcon.classList.remove('clicked');
        }
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="absolute -left-9999 opacity-0"
                tabIndex={-1}
            >
                Click me
            </button>
            {isOpen && (
                <div
                    onClick={closeModal}
                    className="modal-wrapper fixed top-0 right-0 w-full h-full flex items-center z-10 justify-center"
                >
                    <div className="modal-content w-4/5">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;