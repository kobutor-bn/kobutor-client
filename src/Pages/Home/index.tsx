import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider.tsx";
import Accordion from "../../Components/Accordion/Accordion.tsx";
import {images} from "../ProductDetails/index.ts";
import hpone from "../../assets/hpone.jpg";
import React from "react";

const Home: React.FC = () => {
    return (
        <div>

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
            <Accordion></Accordion>
        </div>

    )
}

export default Home;