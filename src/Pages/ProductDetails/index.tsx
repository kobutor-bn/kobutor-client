import chair from "../../assets/chair.jpg";
import Card from "../../Components/Card/Card.tsx";
import {useEffect, useState} from "react";
import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider.tsx";
import {images} from "./index.ts";
import {useParams} from "react-router-dom";
import {RootState} from "../../store.ts";
import {useSelector} from "react-redux";

function ProductDetails() {
    const products = useSelector((state: RootState) => state.products.items)
    const [product, setProduct] = useState<IProduct.Item>({
        category: "",
        desc: "",
        id: "",
        imgUrl: "",
        price: 0,
        quantity: 0,
        size: "",
        stock: 0,
        title: ""
    });
    const {id} = useParams();

    useEffect(() => {
        products.find(product => {
            if (product.id === id) {
                setProduct(product)
            }
        });
    }, []);

    return (
        <>
            <div className="max-w-screen-2xl mx-auto flex flex-col gap-3 p-4 pt-20">
                <Card item={product} size={"dynamic"}>
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