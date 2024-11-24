import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAddFavorite, useFavorites, useRemoveFavorite} from "../../Services/store/hooks/favorites.ts";
import Error from "../../Pages/Error.tsx";
import Loading from "../Loading";
import {useCategoryMap} from "./CategoryMap.tsx";

interface ListingCardProps {
    item: IProduct.Item;
}

const FavListingCard: React.FC<ListingCardProps> = ({item}) => {
    const {products, isLoading: isFavLoading, error: favError} = useFavorites();
    const {renderAttrByCategory, renderImgByCategory} = useCategoryMap({item});
    const {removeFav, isLoading: isRemoveFavLoading, error: isRemoveFavError} = useRemoveFavorite();
    const {addFav, isLoading: isAddFavLoading, error: isAddFavError} = useAddFavorite();
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        products.map((product: IProduct.Item) => {
            if (product.id === item.id) setIsFavorited(true);
        })
    }, []);

    const handleFavoriteClick = () => {
        if (isFavorited) {
            removeFav(item.id);
            setIsFavorited(!isFavorited);
        } else {
            addFav(item.id);
            setIsFavorited(!isFavorited);
        }
    };

    const error = favError || isRemoveFavError || isAddFavError;
    const isLoading = isFavLoading || isRemoveFavLoading || isAddFavLoading;
    if (error) return <Error error={error}/>
    if (isLoading) return <Loading/>;

    return (
        <div className="w-full mx-auto bg-white overflow-hidden shadow-md rounded-lg">
            <div className="relative">
                <Link to={`/product/details/${item.id}`}>
                    {renderImgByCategory(item.category)}
                </Link>
                {/* Heart button */}
                <button
                    onClick={handleFavoriteClick}
                    className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-md transition ${
                        isFavorited ? 'text-rose-500' : 'text-gray-400'
                    } hover:text-rose-500`}
                    aria-label="Add to favorites"
                >
                    {isFavorited ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.35l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                    )}
                </button>

            </div>
            <div className="flex flex-col max-w-screen-2xl w-full text-sm pt-4 gap-1 px-4">
                <div>
                    {renderAttrByCategory(item.category)}
                    <Link to={`/product/details/${item.id}`}>
                        <div className="font-montserrat font-semibold uppercase tracking-wide text-sm text-indigo-500">
                            {item.category}
                        </div>
                        <span className="font-montserrat font-semibold block leading-tight text-black hover:underline">
                            {item.title}
                        </span>
                        <p className="font-Nunito font-light text-slate-500">{item.desc}</p>
                        <p className="font-montserrat text-rose-500">${item.price}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FavListingCard;