import Card from "../../Components/Card/Card.tsx";
import {useEffect, useState} from "react";
import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider.tsx";
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
                <Card item={product}></Card>
                <div className="pt-8">
                    <NormalSlider title={"Recently Viewed"}></NormalSlider>
                </div>
            </div>
        </>

    )
}

export default ProductDetails;