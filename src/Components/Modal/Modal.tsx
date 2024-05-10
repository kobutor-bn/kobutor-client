import React, {useState} from 'react';
import './Modal.css'; // Import the CSS file for styling

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLDivElement).classList.contains('modal-wrapper')) {
            toggleModal();
        }
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Open Modal
            </button>
            {isOpen && (
                <div
                    onClick={closeModal}
                    className="modal-wrapper fixed top-0 left-0 w-full h-full flex items-center justify-center"
                >
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;