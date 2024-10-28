import React, {useState} from 'react';
import './index.css';
import one from '../../assets/BgRemoved/1.png';
import two from '../../assets/BgRemoved/2.png';
import three from '../../assets/BgRemoved/3.png';
import four from '../../assets/BgRemoved/4.png';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import 'swiper/css';

const Banner: React.FC = () => {
    const banners = [one, two, three, four];
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <Swiper
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                pagination={{
                    clickable: false,
                }}
                navigation={false}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {banners.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="py-16 banner-wrapper w-full h-full">
                            <div
                                className={`flex flex-col md:flex-row banner-container bg-[#252525] text-yellow-100 items-center justify-center xl:gap-14 2xl:gap-36 ${
                                    activeIndex === i ? 'animate-slide' : ''
                                }`}
                            >
                                <div className="text-container p-0 pt-14 md:p-10 md:pt-28">
                                    <h1 className="text-4xl 2xl:text-7xl font-semibold text-center font-montserrat">
                                        Elegance Redefined
                                    </h1>
                                    <p className="mt-4 text-sm 2xl:text-2xl text-center font-Nunito">
                                        Discover our latest collection of luxury handbags. <br/>
                                        Perfect for any occasion.
                                    </p>
                                </div>
                                <div className="image-container transform transition-transform duration-2000">
                                    <img src={item} alt="Promotional" className="banner-image"/>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Banner;