import DetailsCard from "../../Components/Card/DetailsCard.tsx";
import TagSlider from "../../Components/TagSlider";
import {useParams, Link} from "react-router-dom";
import {useProductDetails} from "../../Services/store/hooks/products.ts";
import Modal from "../../Components/Popup/Modal";
import Button from "../../Components/Button.tsx";
import Form from "../../Components/Form/index.tsx";
import {reviewFormConfig} from "../../Components/Form/config.ts";
import {useAddReview} from "../../Services/store/hooks/review.ts";
import {useSelector} from "react-redux";
import {z} from "zod";
import Loading from "../../Components/Loading";
import Error from "../Error.tsx";
import {reviewSchema} from "../../Components/Form/schema.ts";
import {userSelector} from "../../Services/store/slices/auth.ts";
import {useState} from "react";
import {HiOutlineShieldCheck, HiOutlineTruck, HiOutlineRefresh} from "react-icons/hi";

function ProductDetails() {
    const {id} = useParams();
    const {product, isLoading, error} = useProductDetails(id!);
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
                        product_id: id
                    })
                        .unwrap()
                        .then(() => {
                            setIsOpen(false);
                        });
                }
            } catch (error) {
                console.error('Failed to submit review:', error);
            }
        },
    };

    if (isLoading) return <Loading/>;
    if (error) return <Error error={error}/>;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-4 2xl:py-6">
                    <nav className="flex items-center gap-2 text-sm 2xl:text-lg text-gray-600">
                        <Link to="/" className="hover:text-blue-600">Home</Link>
                        <span>/</span>
                        <Link to="/product/listing" className="hover:text-blue-600">Products</Link>
                        <span>/</span>
                        <Link to={`/product/listing?category=${product.category}`} className="hover:text-blue-600">
                            {product.category}
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 font-semibold truncate">{product.title}</span>
                    </nav>
                </div>
            </div>

            {/* Product Details */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-8 2xl:py-12">
                <DetailsCard item={product} category={product.category}/>
            </div>

            {/* Trust Badges */}
            <div className="bg-white py-12 2xl:py-16 border-y border-gray-200">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-3">
                            <div className="flex justify-center">
                                <HiOutlineTruck className="h-12 w-12 2xl:h-16 2xl:w-16 text-blue-600"/>
                            </div>
                            <h3 className="font-montserrat font-bold text-lg 2xl:text-2xl">Free Shipping</h3>
                            <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">On orders over €50</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-center">
                                <HiOutlineShieldCheck className="h-12 w-12 2xl:h-16 2xl:w-16 text-blue-600"/>
                            </div>
                            <h3 className="font-montserrat font-bold text-lg 2xl:text-2xl">Secure Payment</h3>
                            <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">100% protected checkout</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-center">
                                <HiOutlineRefresh className="h-12 w-12 2xl:h-16 2xl:w-16 text-blue-600"/>
                            </div>
                            <h3 className="font-montserrat font-bold text-lg 2xl:text-2xl">Easy Returns</h3>
                            <p className="font-Nunito text-sm 2xl:text-lg text-gray-600">30-day money-back guarantee</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Reviews Section */}
            {user && (
                <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-12 2xl:py-16">
                    <div className="bg-white rounded-2xl shadow-md p-6 2xl:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-montserrat text-2xl 2xl:text-4xl font-bold">Customer Reviews</h2>
                            <Modal
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                trigger={
                                    <Button
                                        text="Write a Review"
                                        className="!py-3 !px-6 2xl:!py-4 2xl:!px-8 !text-base 2xl:!text-xl"
                                    />
                                }
                                body={<Form title="Write Your Review" {...configWithSubmit} />}
                            />
                        </div>
                        <p className="text-gray-600 text-sm 2xl:text-lg">Share your thoughts with other customers</p>
                    </div>
                </div>
            )}

            {/* Related Products */}
            <div className="max-w-screen-2xl mx-auto px-4 md:px-6 pb-16 2xl:pb-24">
                <TagSlider title="You May Also Like"/>
            </div>
        </div>
    );
}

export default ProductDetails;