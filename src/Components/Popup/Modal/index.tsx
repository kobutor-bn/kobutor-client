import React, { useState } from 'react';
import {IModal} from "../../../Services/typings/Modal";
import ModalContent from './ModalContent';

const Modal: React.FC<IModal.ModalProps> = ({ trigger, body }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleTriggerClick = () => {
        setIsModalOpen(true);
    };

    const triggerWithHandler = React.cloneElement(trigger, {
        onClick: handleTriggerClick,
    });

    return (
        <>
            {triggerWithHandler}
            <ModalContent
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                content={body}
            />
        </>
    );
};

export default Modal;