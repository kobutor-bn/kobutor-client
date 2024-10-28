import DetailsCard from "../../Components/Card/DetailsCard.tsx";
import NormalSlider from "../../Components/Slider/NormalSlider/NormalSlider.tsx";
import {useParams} from "react-router-dom";
import {useProductDetails} from "../../Services/hooks/products.ts";
import {CgSpinner} from "react-icons/cg";

function ProductDetails() {
    const {id} = useParams();
    const { data, isLoading, error } = useProductDetails(id!);

    if (isLoading) return <CgSpinner title="Loading Products" />;
    if (error) return <p>Error loading tag data</p>;

    return (
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-3 p-4 pt-20">
            <DetailsCard item={data!.item}></DetailsCard>
            <div className="font-montserrat font-semibold pt-8">
                <NormalSlider
                    title={"Recently Viewed"}
                    slide={undefined}>
                </NormalSlider>
            </div>
        </div>
    )
}

export default ProductDetails;