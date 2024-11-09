import React from "react";

declare namespace IModal {
    export interface ModalProps {
        trigger: React.ReactElement;
        body: React.ReactNode;
    }

    export interface ModalContentProps {
        isOpen: boolean;
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
        content: React.ReactNode;
    }
}