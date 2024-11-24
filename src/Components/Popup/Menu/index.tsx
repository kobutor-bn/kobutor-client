import React from 'react';
import MenuContent from "./MenuContent.tsx";
import {IMenu} from "../../../Services/typings/Menu";

const Menu: React.FC<IMenu.Item> = (props) => {
    const {isOpen, setIsOpen, trigger, logout} = props;

    const closeMenu = () => {
        setIsOpen(false);
        const menuIcon = document.querySelector('.menu-icon');
        if (menuIcon) {
            menuIcon.classList.remove('clicked');
        }
    }

    const handleTriggerClick = () => {
        setIsOpen(!isOpen);
    };

    const triggerWithHandler = React.cloneElement(trigger!, {
        onClick: handleTriggerClick,
    });

    return (
        <>
            {triggerWithHandler}
            <MenuContent
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onCloseRequest={closeMenu}
                logout={logout}
            />
        </>
    );
};

export default Menu;