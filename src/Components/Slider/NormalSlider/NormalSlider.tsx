import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation, Pagination} from 'swiper/modules';
import {useSelector} from "react-redux";
import {RootState} from "../../../Services/store";
import "../index.css";
import {ICommon} from "../../../Services/typings/Common";
import LazyImage from "../../../Services/lazy/lazyImage.tsx";
import {Link} from "react-router-dom";


const NormalSlider: React.FC<ICommon.SliderProps> = (props) => {
    const {title} = props;
    const products = useSelector((state: RootState) => state.products.items)

    return (
        <div className="md:p-4 pr-0 xl:mb-28 mb-20">
            <p className="font-bold text-2xl 2xl:text-5xl py-6 px-2">{title}</p>
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
                        slidesPerView: 1.50,
                        spaceBetween: 30,
                    },
                    320: {
                        slidesPerView: 1.15,
                        spaceBetween: 15,
                    },
                }}
            >
                {products.map((product, i) => (
                    <SwiperSlide>
                        <Link to={`/product/details/${product.id}`}>
                            <LazyImage className="sliderImg" key={i} src={product.imgUrl} alt={""}/>
                            <p className="font-medium 2xl:text-5xl pt-5 text-3xl">{product.title}</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default NormalSlider;