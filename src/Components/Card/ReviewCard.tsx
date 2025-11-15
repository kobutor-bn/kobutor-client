import React from "react";
import {Link} from "react-router-dom";
import LazyImage from "../../Services/lazy/lazyImage.tsx";
import {useReviewDetails} from "../../Services/store/hooks/review.ts";
import Loading from "../Loading";
import Error from "../../Pages/Error.tsx";

const MAX_DESCRIPTION_LENGTH = 100;
const ReviewCard: React.FC<{ id: string }> = ({id}) => {
    const {review, isLoading, error} = useReviewDetails(id);

    if (isLoading) return <Loading/>;
    if (error) return <Error error={error}/>;
    if (!review) return null; // Add this safety check

    const isDescriptionLong = (review.product?.desc?.length ?? 0) > MAX_DESCRIPTION_LENGTH;
    const displayedDescription = isDescriptionLong
        ? review.product?.desc?.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
        : review.product?.desc;

    return (
        <div className="flex flex-col gap-4 bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4">
                <LazyImage
                    className="w-12 h-12 rounded-full object-cover shadow"
                    src={review.user?.avatar || "/default-avatar.png"}
                    alt={`${review.user?.name}'s avatar`}
                />
                <p className="font-montserrat font-semibold text-lg">{review.user?.name}</p>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
                {displayedDescription}{" "}
                {isDescriptionLong && (
                    <Link
                        to={`/review/details/${id}`}
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Read More
                    </Link>
                )}
            </p>
            {review.product?.images && review.product.images.length > 0 && (
                <LazyImage
                    className="w-full h-48 rounded-md object-cover"
                    src={review.product.images[0]}
                    alt={review.product.title || "Product image"}
                />
            )}
        </div>
    );
};

export default ReviewCard;