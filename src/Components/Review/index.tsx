import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Pagination, Autoplay} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import './index.css';
import ReviewCard from "../Card/ReviewCard.tsx";
import {useReviews} from "../../Services/store/hooks/review.ts";
import {HiStar} from "react-icons/hi";

const Review: React.FC<{ isMediumScreen: boolean }> = ({isMediumScreen}) => {
    const {reviews} = useReviews();

    // Calculate average rating
    const averageRating = reviews?.length > 0
        ? (reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / reviews.length).toFixed(1)
        : "0.0";

    return (
        <section className="py-20 lg:py-28 2xl:py-36 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-12 2xl:mb-16">
                    <h2 className="font-montserrat font-black text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="font-Nunito text-gray-600 text-base md:text-lg 2xl:text-2xl max-w-2xl mx-auto mb-6">
                        Don't just take our word for it - hear from our satisfied customers
                    </p>

                    {/* Rating Summary */}
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <HiStar key={i} className="h-6 w-6 2xl:h-8 2xl:w-8 text-yellow-400"/>
                            ))}
                        </div>
                        <span className="font-bold text-2xl 2xl:text-3xl text-gray-900">{averageRating}</span>
                    </div>
                    <p className="text-sm 2xl:text-lg text-gray-600">
                        Based on {reviews?.length || 0} verified reviews
                    </p>
                </div>

                {/* Reviews Grid/Slider */}
                <div className="flex flex-col items-center">
                    {isMediumScreen ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                            {reviews?.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 2xl:p-8 border border-gray-100"
                                >
                                    <ReviewCard id={item.id}/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Swiper
                            slidesPerView={1.1}
                            spaceBetween={20}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            modules={[FreeMode, Pagination, Autoplay]}
                            className="w-full max-w-lg !pb-12"
                        >
                            {reviews?.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                        <ReviewCard id={item.id}/>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 2xl:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="space-y-2">
                        <p className="font-montserrat font-bold text-3xl 2xl:text-5xl text-blue-600">10K+</p>
                        <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">Happy Customers</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-montserrat font-bold text-3xl 2xl:text-5xl text-blue-600">4.8★</p>
                        <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">Average Rating</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-montserrat font-bold text-3xl 2xl:text-5xl text-blue-600">98%</p>
                        <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">Satisfaction Rate</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-montserrat font-bold text-3xl 2xl:text-5xl text-blue-600">24/7</p>
                        <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">Customer Support</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;