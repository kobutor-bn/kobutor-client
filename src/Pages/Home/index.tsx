import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider.tsx";
import Accordion from "../../Components/Accordion/Accordion.tsx";
import {images} from "../ProductDetails/index.ts";
import hpone from "../../assets/hpone.jpg";
import Modal from "../../Components/Modal";
import React from "react";
import DDMenu from "../../Components/Modal/DDMenu.tsx";

const Home: React.FC = () => {
    return (
        <div>
            <p className="text-center py-4">
                Free Delivery, Member Exclusive Products and Promos for all our Members. <br/>
                <span className="underline font-bold">Join us!</span>
            </p>
            <img className="h-96 md:w-screen mx-auto" src={hpone} alt={"chair"}/>
            <NormalSlider
                length={0}
                current={0}
                title={'Trending This Week'}
                desc={''}
                images={images}/>
            <NormalSlider
                length={0}
                current={0}
                title={'Hottest Index'}
                desc={''}
                images={images}/>
            <Modal>
                <h1 className="text-lg font-bold mb-4">Modal Content</h1>
                <DDMenu></DDMenu>
            </Modal>
            <Accordion></Accordion>
        </div>

    )
}

export default Home;