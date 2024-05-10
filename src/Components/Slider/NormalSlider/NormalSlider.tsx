import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation, Pagination} from 'swiper/modules';


const Slider: React.FC<ICommon.SliderProps> = (props) => {
    const {length, current, title, desc, images} = props;

    return (
        <div className="p-4 pr-0">
            <p className="font-bold text-2xl py-6">{title}</p>
            <Swiper
                slidesPerView={5 / 4}
                spaceBetween={25}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {images.map((image, i) => (
                    <SwiperSlide>
                        <img key={i} src={image.url} className="" alt=""/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Slider;