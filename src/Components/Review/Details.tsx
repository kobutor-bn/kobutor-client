import React from 'react';
import {useReviewDetails} from "../../Services/store/hooks/review.ts";
import Loading from "../Loading";
import Error from "../../Pages/Error.tsx";
import {useParams} from "react-router-dom";
import LazyImage from "../../Services/lazy/lazyImage.tsx";
import {formatDate} from "../../Services/util/General.ts";

const ReviewDetails: React.FC = () => {
    const {id} = useParams();
    const {review, isLoading, error} = useReviewDetails(id!);

    if (isLoading) return <Loading/>
    if (error) return <Error error={error}/>;

    return (
        <div className="max-w-lg mx-auto bg-white my-16 px-8 py-10 rounded-lg shadow-md border border-gray-200">
            <div className="text-indigo-500 font-semibold text-sm uppercase tracking-wide">Review</div>

            <h2 className="mt-2 text-2xl font-semibold text-black hover:underline">{review!.review.title}</h2>

            <div className="mt-2 text-slate-500 font-light">
                <span className="text-sm font-medium text-yellow-500 ">Rating: </span>
                <span className="font-semibold text-rose-400 ">{review!.review.rating} / 5</span>
            </div>

            <div className="flex gap-5 my-12">
                {review!.product.images && review!.product.images.map((image: string) => (
                    <LazyImage
                        className="flex-shrink-0 object-cover w-32 h-32"
                        src={image}
                        alt={""}/>
                ))}
            </div>


            <p className="mt-4 text-slate-700 font-Nunito">{review!.product.desc}</p>

            <div className="mt-4 text-sm font-light text-slate-500">
                <span>Reviewed on: {formatDate(review!.review.created_at)}</span>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    className="text-indigo-500 font-semibold text-sm hover:underline"
                    onClick={() => alert('Feature not implemented')}
                >
                    Report
                </button>
            </div>
        </div>
    );
};

export default ReviewDetails;