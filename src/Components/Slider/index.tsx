import React from 'react';
import {Swiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation, Pagination} from 'swiper/modules';
import './index.css';
import {ICommon} from "../../Services/typings/Common";

const Slider: React.FC<ICommon.SliderProps> = (props) => {
    const {title, slide} = props;

    return (
        <div>
            <p className="font-bold text-2xl py-6">{title}</p>
            <Swiper
                slidesPerView={1.25}
                spaceBetween={15}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                    1024: {
                        slidesPerView: 1.75,
                        spaceBetween: 30,
                    },
                    1440: {
                        slidesPerView: 2.25,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 1.5,
                        spaceBetween: 30,
                    },
                    320: {
                        slidesPerView: 1.15,
                        spaceBetween: 15,
                    },
                }}
            >
                {slide}
            </Swiper>
        </div>
    );
};

export default Slider;