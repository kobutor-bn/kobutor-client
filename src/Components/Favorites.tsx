import React from 'react';
import {useFavorites} from "../Services/store/hooks/favorites.ts";
import Loading from "./Loading";
import Error from "../Pages/Error.tsx";
import FavListingCard from "./Card/FavListingCard.tsx";

const Favorites: React.FC = () => {
    const {products, isLoading, error} = useFavorites();

    const Main = () => (
        <>
            <div
                className="font-Nunito flex gap-5 md:justify-center text-center mx-auto md:flex-wrap whitespace-nowrap py-6 px-4 shadow-lg overflow-x-scroll">
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Leather Bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Vanity Bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Handbags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Satchel bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Crossbody bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Shoulder bags</div>
            </div>
            <div className="flex flex-col gap-8 max-w-screen-2xl mx-auto p-4 py-8 pt-4">
                <p className="font-bold text-xl">Favorites</p>
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product: IProduct.Item) => {
                        return (
                            <FavListingCard
                                key={product.id}
                                item={product}
                            ></FavListingCard>
                        );
                    })}
                </div>
            </div>
        </>
    )

    if (isLoading) return <Loading/>
    if (error) return <Error error={error}/>

    return (
        <>
            {products && products.length > 0 ?
                (<Main/>) : (<div>You have no favorite items!</div>)
            }
        </>
    );
};

export default Favorites;