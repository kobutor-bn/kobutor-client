import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation, Pagination} from 'swiper/modules';
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import "./index.css";


const NormalSlider: React.FC<ICommon.SliderProps> = (props) => {
    const {title} = props;
    const products = useSelector((state: RootState) => state.products.items)

    return (
        <div className="">
            <p className="font-bold text-2xl py-6">{title}</p>
            <Swiper
                slidesPerView={1.25}
                spaceBetween={15}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                    1024: {
                        slidesPerView: 2.75,
                        spaceBetween: 30,
                    },
                    1440: {
                        slidesPerView: 3.25,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 1.50,
                        spaceBetween: 30,
                    },
                }}
            >
                {products.map((product, i) => (
                    <SwiperSlide>
                        <img key={i} src={product.imgUrl} className="sliderImg" alt=""/>
                        <p className="font-medium pt-5 text-3xl">{product.title}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default NormalSlider;