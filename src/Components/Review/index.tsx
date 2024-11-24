import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import './index.css'

import ReviewCard from "../Card/ReviewCard.tsx";
import {useReviews} from "../../Services/store/hooks/review.ts";

const Review: React.FC<{ isMediumScreen: boolean }> = ({isMediumScreen}) => {
    const {reviews} = useReviews();

    return (
        <div className="py-16 lg:py-20 bg-neutral-50 shadow-sm rounded-xl">
            <p className="font-montserrat font-black text-2xl lg:text-3xl xl:text-4xl text-center pb-10">
                What Our Customers Are Saying
            </p>
            <div className="flex flex-col items-center mx-auto max-w-7xl">
                {isMediumScreen ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {reviews.map((item) => (
                            <div key={item.id}
                                 className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                <ReviewCard id={item.id}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        pagination={{clickable: true}}
                        modules={[FreeMode, Pagination]}
                        className="w-full max-w-md"
                    >
                        {reviews.map((item, i) => (
                            <SwiperSlide key={i}>
                                <div className="bg-white rounded-lg shadow-md p-6">
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