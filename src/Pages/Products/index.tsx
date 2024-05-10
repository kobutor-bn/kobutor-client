import DetailsCard from "../../Components/Card/DetailsCard.tsx";
import {images} from "./index.ts";

function Products() {

    return (
        <div className="max-w-screen-2xl mx-auto p-4">
            <p className="text-center py-4">
                Free Delivery, Member Exclusive Products and Promos for all our Members. <br/>
                <span className="underline font-bold">Join us!</span>
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(134px,_1fr))] gap-5">
                {images.map((image, i) => {
                    return <DetailsCard
                        key={i}
                        title={"Chair"}
                        desc={"A fucking Chair"}
                        imgUrl={image.url}
                        price={0}
                        size={"fixed"}>
                    </DetailsCard>
                })}
            </div>
        </div>

    )
}

export default Products;