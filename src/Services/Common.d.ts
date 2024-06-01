declare namespace ICommon {
    type Image = {
        id: number;
        title: string;
        url: string;
        desc: string;
    };

    interface SliderProps {
        title: string;
        // children: React.ReactNode;
    }
}