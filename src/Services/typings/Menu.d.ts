import React from "react";

declare namespace IMenu {
    export interface Item {
        trigger?: React.ReactElement;
        logout: () => void;
        onCloseRequest?: () => void;
        isOpen: boolean;
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }
}