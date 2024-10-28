import React from 'react';
import ListingCard from "./Card/ListingCard.tsx";
import {useSelector} from "react-redux";
import {userSelector} from "../Services/store/slices/user.ts";

const Favorites: React.FC = () => {
    const user = useSelector(userSelector);

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
                    {/*{user!.favorites.map((product, i) => {*/}
                    {/*    return (*/}
                    {/*        <ListingCard*/}
                    {/*            key={i}*/}
                    {/*            item={product}*/}
                    {/*        ></ListingCard>*/}
                    {/*    );*/}
                    {/*})}*/}
                </div>
            </div>
        </>
    )
    return (
        <>
            {/*{!user || !user.favorites || user.favorites.length === 0 ? (*/}
            {/*    <p className="mx-auto text-center text-2xl font-bold p-5 py-20">You have no favorite items!</p>*/}
            {/*) : (*/}
                <Main/>
            {/*)}*/}
        </>
    );
};

export default Favorites;