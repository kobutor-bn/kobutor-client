import React from 'react';
import './index.css';
import {IModal} from "../../Services/Modal";

const Menu: React.FC<IModal.Props> = ({trigger, body}) => {
    return (
        <>
            {trigger}
            {body}
        </>
    );
};

export default Menu;