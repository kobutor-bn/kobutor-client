import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {toggleModal} from './state.ts';

const ModalContent: React.FC<{ content: React.ReactNode }> = ({content}) => {
    const dispatch: AppDispatch = useDispatch();
    const isModalOpen = useSelector((state: RootState) => state.menu.isModalOpen);
    const modalWrapperRef = useRef<HTMLDivElement | null>(null);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalWrapperRef.current && modalWrapperRef.current === e.target) {
            dispatch(toggleModal());
        }
    };

    return (
        <>
            {isModalOpen && (
                <div
                    onClick={handleOverlayClick}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    ref={modalWrapperRef}
                >
                    <div

                        className="bg-white w-11/12 md:w-1/3 lg:w-1/4 p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-out"
                    >
                        <div className="flex justify-end">
                            <button
                                onClick={() => dispatch(toggleModal())}
                                className="text-gray-500 bg-gray-200 px-2 rounded-full hover:text-gray-800"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-2">
                            {content}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalContent;