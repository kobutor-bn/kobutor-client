import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import LazyImage from "../../Services/lazy/lazyImage.tsx";
import {useReviewDetails} from "../../Services/store/hooks/review.ts";
import Loading from "../Loading";
import Error from "../../Pages/Error.tsx";

const MAX_DESCRIPTION_LENGTH = 100;

const ReviewCard: React.FC<{id: string}> = ({ id}) => {
    const { review, isLoading, error } = useReviewDetails(id);

    const isDescriptionLong = review?.product?.desc?.length > MAX_DESCRIPTION_LENGTH;
    const displayedDescription = isDescriptionLong
        ? review?.product.desc.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
        : review?.product.desc;

    useEffect(() => {
        console.log(review?.product.images)
    }, [review?.product.images]);

    if (isLoading) return <Loading/>;
    if (error) return <Error error={error} />;

    return (
        <div className="flex flex-col items-center gap-3 border border-gray-500 p-8 pb-14 mb-14 md:mb-0 md:pb-8">
            <div className="flex flex-col gap-0.5">
                <p className="font-montserrat font-semibold text-xl">{review?.user.name}</p>
                <p className="font-Nunito font-light text-md text-center text-neutral-500">{review?.review.created_at}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
                <p className="font-Nunito text-sm">
                    {displayedDescription}{" "}
                    {isDescriptionLong && (
                        <Link to={'/another_page'} className="text-blue-500">
                            See more
                        </Link>
                    )}
                </p>
                <div className="flex gap-2">
                    {review?.product.images?.map((img, i) => (
                        <LazyImage
                            className="flex-shrink-0 object-cover w-32 h-32"
                            key={i}
                            src={img}
                            alt={""}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;