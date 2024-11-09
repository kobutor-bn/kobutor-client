import React, {useEffect, useState} from 'react';
import Accordion from "../../Components/Accordion";
import "./index.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import Review from "../../Components/Review.tsx";
import {Banner} from "../../Services/typings/Enums.ts";
import TagSlider from "../../Components/TagSlider";

const Home: React.FC = () => {
    const [banner, setBanner] =
        useState(window.innerWidth >= 768 ? Banner.Large : Banner.Small);
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setBanner(window.innerWidth >= 768 ? Banner.Large : Banner.Small);
            setIsMediumScreen(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className="relative flex justify-center items-center">
                <div className="relative">
                    <div className={`placeholder ${isImageLoaded ? 'hidden' : 'block'}`}></div>
                    <img
                        className="advertise md:w-full xl:aspect-[4/2] w-full mx-auto mb-10   xl:py-12  mt-6"
                        src={banner}
                        alt="Advertisement"
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
            </div>
            <div className="lg:p-6 pt-16">
                <TagSlider
                    title="Best Seller"
                    id='cs1i4q7q4o9iqv7652q0'/>
                <Accordion/>
                <TagSlider
                    title="Featured This Week"
                    id='cs1ict7q4o9j8k43gqcg'/>
                <Review isMediumScreen={isMediumScreen}/>
            </div>
        </div>
    );
};

export default Home;