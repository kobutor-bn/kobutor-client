import React, {useEffect, useState} from "react";
import Accordion from "../../Components/Accordion";
import "./index.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import Review from "../../Components/Review";
import {Banner} from "../../Services/typings/Enums.ts";
import TagSlider from "../../Components/TagSlider";
import LazyImage from "../../Services/lazy/lazyImage.tsx";

const Home: React.FC = () => {
    const [banner, setBanner] = useState(window.innerWidth >= 768 ? Banner.Large : Banner.Small);
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768);
    // const [isImageLoaded, setIsImageLoaded] = useState(false);

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
        <div className="bg-gray-50">
            {/* Banner Section */}
            <div className="relative flex justify-center items-center">
                <div className="relative w-full max-w-7xl">
                    {/*{!isImageLoaded && (*/}
                        <div className="placeholder h-64 md:h-96 bg-gray-200 animate-pulse rounded-lg"></div>
                    {/*)}*/}
                    <LazyImage
                        className={`advertise w-full rounded-lg shadow-lg transition-opacity duration-700 `}
                        src={banner}
                        alt="Advertisement"
                        // onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:p-12 p-6 space-y-16">
                {/* TagSlider Section */}
                <TagSlider title="Best Sellers" id="cs1i4q7q4o9iqv7652q0"/>
                <TagSlider title="Featured This Week" id="cs1ict7q4o9j8k43gqcg"/>

                {/* Reviews Section */}
                <Review isMediumScreen={isMediumScreen}/>

                {/* Accordion Section */}
                <Accordion/>
            </div>
        </div>
    );
};

export default Home;