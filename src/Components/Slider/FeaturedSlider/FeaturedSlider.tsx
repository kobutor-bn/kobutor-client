import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation, Pagination} from 'swiper/modules';
import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import "../NormalSlider/index.css";


const FeaturedSlider: React.FC<ICommon.SliderProps> = (props) => {
    const {title} = props;
    const products = useSelector((state: RootState) => state.products.items)

    return (
        <div className="md:p-4 pr-0 md:pt-28">
            <p className="font-bold text-2xl py-6">{title}</p>
            <Swiper
                slidesPerView={1.25}
                spaceBetween={25}
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
                    <div>
                        <SwiperSlide>
                            <img key={i} src={product.imgUrl} className="sliderImg" alt=""/>
                            <div className="flex flex-col gap-1 mt-3">
                                <p className="font-bold">{product.title}</p>
                                <p className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.category}</p>
                            </div>
                            <p className="mt-4">USD ${product.price}</p>
                        </SwiperSlide>


                    </div>
                ))}
            </Swiper>
        </div>
    )
}

export default FeaturedSlider;