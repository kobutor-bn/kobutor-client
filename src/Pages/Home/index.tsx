import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Accordion from "../../Components/Accordion";
import "./index.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Review from "../../Components/Review";
import {Banner} from "../../Services/typings/Enums.ts";
import TagSlider from "../../Components/TagSlider";
import {HiOutlineShieldCheck, HiOutlineTruck, HiOutlineRefresh} from "react-icons/hi";
import {BiSupport} from "react-icons/bi";

const Home: React.FC = () => {
    const [banner, setBanner] = useState(window.innerWidth >= 768 ? Banner.Large : Banner.Small);
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setBanner(window.innerWidth >= 768 ? Banner.Large : Banner.Small);
            setIsMediumScreen(window.innerWidth >= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="bg-white">
            {/* Hero Banner Section */}
            <section className="relative w-full bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="relative w-full">
                        {!isImageLoaded && (
                            <div className="w-full h-96 md:h-[500px] 2xl:h-[700px] bg-gray-200 animate-pulse"></div>
                        )}
                        <img
                            className={`w-full h-96 md:h-[500px] 2xl:h-[700px] object-cover transition-opacity duration-700 ${
                                isImageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            src={banner}
                            alt="Shop the latest trends"
                            onLoad={() => setIsImageLoaded(true)}
                        />

                        {/* Hero Overlay Content */}
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
                                <div className="max-w-2xl space-y-6 text-white">
                                    <h1 className="font-montserrat font-black text-4xl md:text-6xl 2xl:text-8xl leading-tight">
                                        Discover Premium Quality
                                    </h1>
                                    <p className="font-Nunito text-lg md:text-2xl 2xl:text-3xl text-gray-200">
                                        Curated electronics and designer bags shipped across Europe
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Link to="/product/listing">
                                            <button
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 2xl:py-6 2xl:px-12 rounded-lg text-base 2xl:text-2xl transition-all transform hover:scale-105 shadow-xl">
                                                Shop Now
                                            </button>
                                        </Link>
                                        <Link to="/about">
                                            <button
                                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 2xl:py-6 2xl:px-12 rounded-lg text-base 2xl:text-2xl transition-all border-2 border-white">
                                                Learn More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges Section */}
            <section className="bg-white py-12 2xl:py-16 border-b border-gray-200">
                <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-3">
                            <div className="flex justify-center">
                                <HiOutlineTruck className="h-12 w-12 2xl:h-16 2xl:w-16 text-blue-600"/>
                            </div>
                            <h3 className="font-montserrat font-bold text-base 2xl:text-xl">Free EU Shipping</h3>
                            <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">Orders over €50</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-center">
                                <HiOutlineShieldCheck className="h-12 w-12 2xl:h-16 2xl:w-16 text-blue-600"/>
                            </div>
                            <h3 className="font-montserrat font-bold text-base 2xl:text-xl">Secure Payment</h3>
                            <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">SSL Protected</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-center">
                                <HiOutlineRefresh className="h-12 w-12 2xl:h-16 2xl:w-16 text-blue-600"/>
                            </div>
                            <h3 className="font-montserrat font-bold text-base 2xl:text-xl">Easy Returns</h3>
                            <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">30-day guarantee</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-center">
                                <BiSupport className="h-12 w-12 2xl:h-16 2xl:w-16 text-blue-600"/>
                            </div>
                            <h3 className="font-montserrat font-bold text-base 2xl:text-xl">24/7 Support</h3>
                            <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">Always here to help</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop by Category Section */}
            <section className="bg-gray-50 py-16 2xl:py-24">
                <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-12">
                        <h2 className="font-montserrat font-bold text-3xl md:text-5xl 2xl:text-7xl text-gray-900 mb-4">
                            Shop by Category
                        </h2>
                        <p className="font-Nunito text-lg 2xl:text-2xl text-gray-600">
                            Explore our curated collections
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Electronics */}
                        <Link
                            to="/product/listing?category=Electronics"
                            className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            <div
                                className="aspect-[4/3] bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200')",
                                }}
                            >
                                {/* Black overlay */}
                                <div
                                    className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all"></div>

                                {/* Content */}
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-10">
                                    <h3 className="font-montserrat font-bold text-4xl 2xl:text-6xl mb-4">
                                        Electronics
                                    </h3>
                                    <p className="font-Nunito text-lg 2xl:text-2xl mb-6 text-center">
                                        Latest gadgets and tech accessories
                                    </p>
                                    <span className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold
                            group-hover:bg-blue-600 group-hover:text-white transition-all">
                            Shop Now →
                        </span>
                                </div>
                            </div>
                        </Link>

                        {/* Women’s Bags */}
                        <Link
                            to="/product/listing?category=Women Bags"
                            className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            <div
                                className="aspect-[4/3] bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://images.unsplash.com/photo-1713425887673-20a893c8d931?q=80&w=1003&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                                }}
                            >
                                <div
                                    className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all"></div>

                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-10">
                                    <h3 className="font-montserrat font-bold text-4xl 2xl:text-6xl mb-4">
                                        Women’s Bags
                                    </h3>
                                    <p className="font-Nunito text-lg 2xl:text-2xl mb-6 text-center">
                                        Designer collections for every occasion
                                    </p>
                                    <span className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold
                group-hover:bg-pink-600 group-hover:text-white transition-all">
                Shop Now →
            </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Product Sections */}
            <div className="py-16 2xl:py-24 space-y-16 2xl:space-y-24">
                <TagSlider title="Best Sellers" id="cs1i4q7q4o9iqv7652q0"/>
                <TagSlider title="Featured This Week" id="cs1ict7q4o9j8k43gqcg"/>
            </div>

            {/* Newsletter Section */}
            <section className="relative py-16 2xl:py-24">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600')",
                    }}
                ></div>

                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative max-w-screen-2xl mx-auto px-6 md:px-12">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="font-montserrat font-bold text-3xl md:text-5xl 2xl:text-7xl mb-4">
                            Join Our Newsletter
                        </h2>
                        <p className="font-Nunito text-lg 2xl:text-2xl mb-8">
                            Get exclusive deals, new arrivals, and 10% off your first order
                        </p>
                        <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 2xl:py-6 2xl:text-2xl rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-white text-blue-600 font-bold px-8 py-4 2xl:py-6 2xl:text-2xl rounded-lg hover:bg-gray-100 transition-all"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-sm 2xl:text-lg mt-4 text-white/80">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <div className="py-16 2xl:py-24">
                <Review isMediumScreen={isMediumScreen}/>
            </div>

            {/* FAQ Section */}
            <section className="bg-gray-50 py-16 2xl:py-24">
                <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-12">
                        <h2 className="font-montserrat font-bold text-3xl md:text-5xl 2xl:text-7xl text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="font-Nunito text-lg 2xl:text-2xl text-gray-600">
                            Everything you need to know about shopping with us
                        </p>
                    </div>
                    <Accordion/>
                </div>
            </section>
        </div>
    );
};

export default Home;