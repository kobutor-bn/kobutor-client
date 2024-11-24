import React, {useRef} from 'react';
import {IModal} from "../../../Services/typings/Modal";

const ModalContent: React.FC<IModal.Item> = (props) => {
    const {isOpen, setIsOpen, body, onCloseRequest} = props;
    const modalWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalWrapperRef.current && modalWrapperRef.current === e.target) {
            setIsOpen(!isOpen)
        }
    };

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
        onCloseRequest?.();
    }

    return (
        <>
            {isOpen && (
                <div
                    onClick={handleOverlayClick}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    ref={modalWrapperRef}
                >
                    <div
                        className="max-w-md w-full m-5 bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-out">
                        <div className="flex justify-end">
                            <button
                                onClick={handleButtonClick}
                                className="text-gray-500 bg-gray-200 px-2 rounded-full hover:text-gray-800"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-2">
                            {body}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalContent;