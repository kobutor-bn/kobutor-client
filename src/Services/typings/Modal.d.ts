import React from "react";

declare namespace IModal {
    export interface Item {
        isOpen: boolean;
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
        trigger?: React.ReactElement;
        body: React.ReactNode;
        onCloseRequest?: () => void;
    }
}