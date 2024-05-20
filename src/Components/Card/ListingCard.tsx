import React from "react";
import {Link} from "react-router-dom";

const ListingCard: React.FC<{ item: IProduct.Item, size: string }> = ({item, size}) => {
    let sizeClass = '';
    let fixedBlock = '';

    switch (size) {
        case 'fixed':
            sizeClass = 'md:w-full';
            fixedBlock = 'flex-col';
            break;
        case 'dynamic':
            sizeClass = '';
            break;
    }

    return (
        <div className="max-w-screen-2xl mx-auto bg-white border-black overflow-hidden">
            <div className={`md:flex ${fixedBlock}`}>
                <Link to={`/product/details/${item.id}`}>
                    <img className={`${sizeClass} object-fill w-fit md:w-3/5`} src={item.imgUrl} alt=""/>
                </Link>
                <div className="flex flex-col max-w-screen-2xl w-full text-sm ga1 pt-4 gap-1">
                    <div>
                        <div className="flex gap-3">
                            <div className="h-3 w-3 p-2 bg-blue-300 rounded-full border-2 border-black"></div>
                            <div className="h-5 w-5 rounded-full border-2 border-black"></div>
                        </div>
                    </div>
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Furniture
                    </div>
                    <Link to={"/product/details"}>
                        <a href="#" className="block leading-tight font-medium text-black hover:underline">
                            {item.title}</a>
                    </Link>
                    <p className="text-slate-500">{item.desc}</p>
                    <p className="text-rose-500 font-bold">${item.price}</p>
                </div>
            </div>
        </div>
    )
}

export default ListingCard;