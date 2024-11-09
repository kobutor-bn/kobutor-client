import DetailsCard from "../../Components/Card/DetailsCard.tsx";
import TagSlider from "../../Components/TagSlider";
import {useParams} from "react-router-dom";
import {useProductDetails} from "../../Services/store/hooks/products.ts";
import Modal from "../../Components/Popup/Modal";
import Button from "../../Components/Button.tsx";
import Form from "../../Components/Form/index.tsx";
import {reviewFormConfig, reviewSchema} from "../../Components/Form/config.ts";
import {useAddReview} from "../../Services/store/hooks/review.ts";
import {useSelector} from "react-redux";
import {userSelector} from "../../Services/store/slices/user.ts";
import {z} from "zod";
import Loading from "../../Components/Loading";
import Error from "../Error.tsx";
import {useState} from "react";

function ProductDetails() {
    const {id} = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { product, isLoading, error } = useProductDetails(id!);
    const {addReview} = useAddReview();
    const user = useSelector(userSelector);

    const configWithSubmit = {
        ...reviewFormConfig,
        schema: reviewSchema,
        onSubmit: async (values: z.infer<typeof reviewSchema>) => {
            try {
                if (user?.id && id) {
                    await addReview({
                        ...values,
                        user_id: user.id,
                        product_id: id })
                        .unwrap()
                        .then(() => setIsOpen(!isOpen));
                    console.log('Review submitted successfully');
                } else {
                    return <Error error={error} />;
                }
            } catch (error) {
                console.error('Failed to submit review:', error);
            }
        },
        // defaultValues,  // Pass only user_id as a default value
    };

    if (isLoading) return <Loading/>;
    if (error) return <Error error={error} />;

    return (
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-3 p-4 pt-20">
            <DetailsCard
                item={product}
                category={product.category}
            />
            <Modal
                trigger={<Button
                    onClick={() => {
                        console.log("ll")
                    }}
                    text="Add Review"
                />}
                body={<Form {...configWithSubmit} />}
            />
            <div className="font-montserrat font-semibold pt-8">
                <TagSlider title="Recently Viewed"/>
            </div>
        </div>
    ) 
}

export default ProductDetails;