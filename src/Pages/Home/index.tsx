import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../Services/store';
import {SwiperSlide} from 'swiper/react';
import hpone from '../../assets/hpone.jpg';
import adLarge from '../../assets/ad.jpg';
import adSmall from '../../assets/adSmall.jpg';
import Accordion from "../../Components/Accordion";
import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider";
import FeaturedSlider from "../../Components/Slider/FeaturedSlider/FeaturedSlider";
import "./index.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import LazyImage from "../../Services/lazy/lazyImage.tsx";
import Review from "../../Components/Review.tsx";

const Home: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.items);
    const [currentAd, setCurrentAd] = useState(window.innerWidth >= 1280 ? adLarge : adSmall);
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth >= 768);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setCurrentAd(window.innerWidth >= 1280 ? adLarge : adSmall);
            setIsMediumScreen(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const NSlider = () => (
        <>
            {products.map((product, i) => (
                <SwiperSlide key={i}>
                    <img src={product.imgUrl} className="sliderImg" alt=""/>
                    <p className="font-medium pt-5 text-3xl">{product.title}</p>
                </SwiperSlide>
            ))}
        </>
    );

    const FSlider = () => (
        <>
            {products.map((product, i) => (
                <SwiperSlide key={i} className="swiperSlide">
                    <img src={product.imgUrl} className="sliderImg" alt=""/>
                    <div className="textContainer">
                        <p className="font-bold">{product.title}</p>
                        <p className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.category}</p>
                        <p className="mt-2">USD ${product.price}</p>
                    </div>
                </SwiperSlide>
            ))}
        </>
    );

    return (
        <div>
            <div className="relative flex justify-center items-center">
                <div className="relative">
                    <div className={`placeholder ${isImageLoaded ? 'hidden' : 'block'}`}></div>
                    <img
                        className="advertise md:w-full xl:aspect-[4/2] w-full mx-auto mb-10 px-6 py-8 xl:px-8 xl:py-12 2xl:px-14 mt-6"
                        src={currentAd}
                        alt="Advertisement"
                        onLoad={() => setIsImageLoaded(true)}
                    />
                    <p className="absolute xl:hidden text-yellow-100 text-2xl md:text-7xl lg:text-8xl font-extrabold text-center left-1/2 transform -translate-x-1/2 bottom-2/3">
                        20% OFF!<br/> Shop Now!
                    </p>
                </div>
                <div
                    className="hidden absolute inset-0 text-yellow-100 xl:flex justify-center text-center items-center font-extrabold text-xl xl:text-8xl 2xl:text-9xl">
                    20-40% OFF!<br/>Shop Now!
                </div>
            </div>
            <LazyImage
                className="md:w-full aspect-square md:aspect-[5/2] w-full mx-auto my-20 md:my-24 lg:my-32 xl:my-36 2xl:my-40"
                src={hpone}
                alt="chair"/>
            <div className="lg:p-6 pt-16">
                <NormalSlider title="Trending This Week" slide={<NSlider/>}/>
                <Accordion/>
                <FeaturedSlider title="Featured This Week" slide={<FSlider/>}/>
                <Review isMediumScreen={isMediumScreen}/>
            </div>
        </div>
    );
};

export default Home;