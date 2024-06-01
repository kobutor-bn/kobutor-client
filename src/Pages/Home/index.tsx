import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider.tsx";
import Accordion from "../../Components/Accordion/Accordion.tsx";
import hpone from "../../assets/hpone.jpg";
import React from "react";
import FeaturedSlider from "../../Components/Slider/FeaturedSlider/FeaturedSlider.tsx";

const Home: React.FC = () => {
    return (
        <div>
            <img className="h-96 md:w-full w-full mx-auto" src={hpone} alt={"chair"}/>
            <div className="lg:p-6">
                <NormalSlider title={'Trending This Week'}/>
                <FeaturedSlider title={'Featured This Week'}/>
                <Accordion></Accordion>
            </div>
        </div>

    )
}

export default Home;