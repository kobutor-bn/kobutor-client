declare namespace ICommon {
    type Image = {
        id: number;
        title: string;
        url: string;
        desc: string;
    };

    interface SliderProps {
        length: number;
        current: number;
        title: string;
        desc: string;
        images: Image[];
        // children: React.ReactNode;
    }
}