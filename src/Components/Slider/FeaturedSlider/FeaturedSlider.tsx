import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {Autoplay, Navigation, Pagination} from 'swiper/modules';

import chair from "../../../assets/chair.jpg";
import camera from "../../../assets/camera.jpg";
import hpone from "../../../assets/hpone.jpg";

type Image = {
    id: string;
    name: string;
    avatar: string;
    describe: string;
    createdAt: number;
};

interface SliderProps {
    length: number;
    current: number;
    title: string;
    desc: string;
    images: Image[];
    // children: React.ReactNode;
}

const FeaturedSlider: React.FC<SliderProps> = (props) => {
    const {length, current, title, desc, images} = props;

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className="md:object-fill" src={chair} alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={camera} alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={hpone} alt=""/>
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>

        // <div className="max-w-md mx-auto bg-black rounded border-2 border-black overflow-hidden md:max-w-2xl">
        //     <div className="md:flex">
        //         <div className="md:shrink-0">
        //             <img className="h-96 w-full object-fill md:h-full md:w-48" src={imgUrl} alt=""/>
        //         </div>
        //         <div className="p-8">
        //             <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Furniture
        //             </div>
        //             <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
        //                 {title}</a>
        //             <p className="mt-2 mb-4 text-slate-500">{desc}</p>
        //             <div className='flex justify-between'>
        //                 <Button text='Buy Now' size='large'></Button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default FeaturedSlider;