import chair from "../../assets/chair.jpg";
import Button from "../../Components/Button.tsx";
import DetailsCard from "../../Components/Card/DetailsCard.tsx";
import {useState} from "react";
import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider.tsx";
import {images} from "./index.ts";

function ProductDetails() {
    const [desc] = useState("Whether you need a way to haul your gear to the game or you need a spacious overnight bag, this duffle has you covered. The main zippered compartment has an inner zippered drop pocket to help you keep smaller items in their place and there is a shoe garage on the side to keep things clean and organized.");

    return (
        <>
            <div className="text-center bg-gray-400 py-4">Free delivery for all members!</div>
            <div className="max-w-screen-2xl mx-auto flex flex-col gap-3 p-4 pt-8">
                <DetailsCard title={"Seamless Mineral Wash Cropped Cami"}
                             desc={""}
                             imgUrl={chair} price={0} size={"dynamic"}/>
                <div className="flex gap-3 py-5">
                    <img src={chair} className="border border-black h-52 w-52 hover:brightness-90" alt=""/>
                    <img src={chair} className="border border-black h-52 w-52 hover:brightness-90" alt=""/>
                </div>
                <p className="text-xl">One Size</p>
                <div className="flex flex-col gap-3 py-4">
                    <Button text="Add to Bag" size="large" color='primary'></Button>
                    <Button text="Favorite ♡" size="large" color='secondary'></Button>
                </div>
                <p>{desc}</p>
                <ul className="list-disc px-5 text-lg py-3">
                    <li>Color Shown: Black</li>
                    <li>Model: Something</li>
                </ul>
                <p className="underline">View Product Details</p>
                <div className="pt-8">
                    <p className="text-2xl font-bold">Recently Viewed:</p>
                    <NormalSlider length={0} current={0} title={""} desc={""} images={images}></NormalSlider>
                </div>
            </div>
        </>

    )
}

export default ProductDetails;