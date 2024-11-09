import React from "react";
import { Link } from "react-router-dom";
import {useCategoryMap} from "./CategoryMap.tsx";

interface ListingCardProps {
    item: IProduct.Item;
}

const ListingCard: React.FC<ListingCardProps> = ({ item }) => {
    const { renderAttrByCategory, renderImgByCategory } = useCategoryMap({ item });

    return (
        <div className="w-full mx-auto bg-white overflow-hidden">
            <div className="flex flex-col">
                <Link to={`/product/details/${item.id}`}>
                    {renderImgByCategory(item.category)}
                </Link>
                <div className="flex flex-col max-w-screen-2xl w-full text-sm pt-4 gap-1">
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
        </div>
    );
};

export default ListingCard;