import chair from "../../assets/chair.jpg";
import Card from "../../Components/Card/Card.tsx";
import {useState} from "react";
import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider.tsx";
import {images} from "./index.ts";

function ProductDetails() {
    const [desc] = useState("Whether you need a way to haul your gear to the game or you need a spacious overnight bag, this duffle has you covered. The main zippered compartment has an inner zippered drop pocket to help you keep smaller items in their place and there is a shoe garage on the side to keep things clean and organized.");

    return (
        <>
            <div className="max-w-screen-2xl mx-auto flex flex-col gap-3 p-4 pt-20">
                <Card title={"Seamless Mineral Wash Cropped Cami"}
                      desc={desc}
                      imgUrl={chair} price={0} size={"dynamic"}>
                </Card>
                <div className="flex gap-3 py-5">
                    <img src={chair} className="border border-black h-52 w-52 hover:brightness-90" alt=""/>
                    <img src={chair} className="border border-black h-52 w-52 hover:brightness-90" alt=""/>
                </div>

                <div className="pt-8">
                    <p className="text-2xl font-bold">Recently Viewed:</p>
                    <NormalSlider length={0} current={0} title={""} desc={""} images={images}></NormalSlider>
                </div>
            </div>
        </>

    )
}

export default ProductDetails;