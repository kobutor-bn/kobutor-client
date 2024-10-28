import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import LazyImage from '../../../Services/lazy/lazyImage.tsx';
import { ICommon } from '../../../Services/typings/Common';
import {useTag} from "../../../Services/hooks/tags.ts";

const NormalSlider: React.FC<ICommon.SliderProps> = ({ title}) => {
    const { products, isLoading, error } = useTag(title);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading tag data</p>;

    return (
        <div className="md:p-4 pr-0 xl:mb-28 mb-20">
            <p className="font-montserrat font-semibold text-2xl 2xl:text-5xl py-6 px-2">{title}</p>
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
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <Link to={`/product/details/${product.id}`}>
                            <LazyImage
                                className="sliderImg"
                                src={product.colors[Object.keys(product.colors)[0]]}
                                alt={product.title}
                            />
                            <p className="font-montserrat font-medium 2xl:text-5xl pt-5 text-3xl">{product.title}</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default NormalSlider;


// import React, {useEffect} from 'react';
// import {Swiper, SwiperSlide} from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import {Navigation, Pagination} from 'swiper/modules';
// import {useDispatch, useSelector} from "react-redux";
// import {AppDispatch, RootState} from "../../../Services/store";
// import "../index.css";
// import {ICommon} from "../../../Services/typings/Common";
// import LazyImage from "../../../Services/lazy/lazyImage.tsx";
// import {Link} from "react-router-dom";
// import {detail} from "../../../Services/store/tags/bestSeller/slice.ts";
//
//
// const NormalSlider: React.FC<ICommon.SliderProps> = (props) => {
//     const {title} = props;
//     const products = useSelector((state: RootState) => state.products.items)
//     const dispatch = useDispatch<AppDispatch>();
//
//     // const status = useSelector((state: RootState) => state.tag.status);
//     // const error = useSelector((state: RootState) => state.tag.error);
//     // const bestSellers = useSelector((state: RootState) => state.bestSeller.items);
//
//     useEffect(() => {
//         if (title == 'Best Seller') {
//             dispatch(detail('cs1i4q7q4o9iqv7652q0'));
//         }
//     }, [dispatch, title]);
//
//     return (
//         <div className="md:p-4 pr-0 xl:mb-28 mb-20">
//             <p className="font-montserrat font-semibold text-2xl 2xl:text-5xl py-6 px-2">{title}</p>
//             <Swiper
//                 slidesPerView={1.25}
//                 spaceBetween={15}
//                 navigation={true}
//                 modules={[Pagination, Navigation]}
//                 className="mySwiper"
//                 breakpoints={{
//                     1024: {
//                         slidesPerView: 1.75,
//                         spaceBetween: 30,
//                     },
//                     1440: {
//                         slidesPerView: 2.25,
//                         spaceBetween: 30,
//                     },
//                     768: {
//                         slidesPerView: 1.50,
//                         spaceBetween: 30,
//                     },
//                     320: {
//                         slidesPerView: 1.15,
//                         spaceBetween: 15,
//                     },
//                 }}
//             >
//                 {products.map((product, i) => (
//                     <SwiperSlide>
//                         <Link to={`/product/details/${product.id}`}>
//                             <LazyImage className="sliderImg" key={i}
//                                        src={product.colors[Object.keys(product.colors)[0]]} alt={product.title}/>
//                             <p className="font-montserrat font-medium 2xl:text-5xl pt-5 text-3xl">{product.title}</p>
//                         </Link>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     )
// }
//
// export default NormalSlider;