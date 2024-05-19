import React from 'react';
import {IDropDown} from "../../Services/Dropdown";

const Dropdown: React.FC<IDropDown.CustomDropdownProps> = ({btn, body}) => {

    return (
        <div className="relative">
            {btn}
            {body}
        </div>
    );
};


export default Dropdown;