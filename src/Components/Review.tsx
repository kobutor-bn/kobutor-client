import React from 'react';
import {useSelector} from 'react-redux';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import {RootState} from "../Services/store";
import ReviewCard from "./Card/ReviewCard.tsx";

const Review: React.FC<{ isMediumScreen: boolean }> = ({isMediumScreen}) => {
    const review = useSelector((state: RootState) => state.review);

    return (
        <div
            className="py-20 xl:py-24 2xl:py-32 rounded-xl 2xl:max-w-screen-2xl max-w-screen-xl w-full m-auto shadow-lg bg-gray-100 my-8">
            <p className="font-bold text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl text-center pb-6 md:pb-9 lg:pb-14 xl:pb-16 2xl:pb-20">Customer
                Reviews</p>
            <div
                className="flex items-center md:gap-6 max-w-screen-xl 2xl:max-w-screen-2xl mx-auto flex-wrap justify-center">
                {isMediumScreen ? (
                    review.map((item, i) => (
                        <div key={i} className="bg-white rounded-md md:max-w-xs 2xl:max-w-md">
                            <ReviewCard item={item}/>
                        </div>
                    ))
                ) : (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        freeMode={false}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[FreeMode, Pagination]}
                        className="mySwiper"
                    >
                        {review.map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="bg-white rounded-sm h-auto">
                                    <ReviewCard item={item}/>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default Review;