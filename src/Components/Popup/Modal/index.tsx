import React from 'react';
import {IModal} from "../../../Services/typings/Modal";

const Modal: React.FC<IModal.Props> = ({trigger, body}) => {
    return (
        <>
            {trigger}
            {body}
        </>
    );
};

export default Modal;