import {ReactNode} from "react";

declare namespace ICommon {
    type Image = {
        id: number;
        title: string;
        url: string;
        desc: string;
    };

    interface SliderProps {
        id?: string;
        title: string;
    }
}