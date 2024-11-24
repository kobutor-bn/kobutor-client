import React from 'react';
import {IModal} from "../../../Services/typings/Modal";
import ModalContent from './ModalContent';

const Modal: React.FC<IModal.Item> = (props) => {
    const {isOpen, setIsOpen, trigger, body, onCloseRequest} = props;

    const handleTriggerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(true);
    };

    const triggerWithHandler = React.cloneElement(trigger!, {
        onClick: handleTriggerClick,
    });

    const handleClose = () => {
        setIsOpen(false);
        onCloseRequest?.();
    };

    return (
        <>
            {triggerWithHandler}
            <ModalContent
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                body={body}
                onCloseRequest={handleClose}
            />
        </>
    );
};

export default Modal;