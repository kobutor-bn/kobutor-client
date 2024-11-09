import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import ReviewCard from "./Card/ReviewCard.tsx";
import {useReviews} from "../Services/store/hooks/review.ts";

const Review: React.FC<{ isMediumScreen: boolean }> = ({isMediumScreen}) => {
    const { reviews } = useReviews();

    return (
        <div
            className="py-20 xl:py-24 2xl:py-32 rounded-xl 2xl:max-w-screen-2xl max-w-screen-xl w-full m-auto shadow-lg bg-neutral-100 my-8">
            <p className="font-montserrat font-black text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl text-center pb-6 md:pb-9 lg:pb-14 xl:pb-16 2xl:pb-20">Customer
                Reviews</p>
            <div
                className="flex items-center md:gap-6 max-w-screen-xl 2xl:max-w-screen-2xl mx-auto flex-wrap justify-center">
                {isMediumScreen ? (
                    reviews.map((item, i) => (
                        <div key={i} className="bg-white rounded-md md:max-w-xs 2xl:max-w-md">
                            <ReviewCard id={item.id}/>
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
                        {reviews.map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="bg-white rounded-sm h-auto">
                                    <ReviewCard id={item.id}/>
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