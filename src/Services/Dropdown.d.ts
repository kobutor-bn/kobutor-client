import {ReactNode} from "react";

declare namespace IDropDown {
    interface State {
        options: IDropDown.Option[];
        isOpen: boolean;
    }

    interface Option {
        label: string;
        value: string;
    }

    interface CustomDropdownProps {
        isOpen: boolean;
        options: Option[];
        selectOption?: (option) => void;
        body: ReactNode;
        btn: ReactNode;
    }
}