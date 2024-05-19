import React from "react";
import {Link} from "react-router-dom";

interface CardProps {
    title: string;
    desc: string;
    imgUrl: string;
    price: number;
    size: 'fixed' | 'dynamic';
}

const ListingCard: React.FC<CardProps> = (props) => {
    const {title, price, imgUrl, size, desc} = props;
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
                <Link to={"/product/details"}>
                    <img className={`${sizeClass} object-fill w-fit md:w-3/5`} src={imgUrl} alt=""/>
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
                            {title}</a>
                    </Link>
                    <p className="text-slate-500">{desc}</p>
                    <p className="text-rose-500 font-bold">${price}</p>
                </div>
            </div>
        </div>

        // <div className="max-w-screen-2xl mx-auto bg-white border-black overflow-hidden">
        //     <div className={`md:flex ${fixedBlock}`}>
        //         <img className={`${sizeClass} object-fill w-fit md:w-3/5`} src={imgUrl} alt=""/>
        //         <div className="py-8 md:px-8">
        //             <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Furniture
        //             </div>
        //             <a href="#"
        //                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
        //                 {title}</a>
        //             <p className="mt-2 text-slate-500">{desc}</p>
        //             <div className='md:flex-none items-center justify-between'>
        //                 <p className="text-rose-500 font-bold">${price}</p>
        //                 <div className="flex flex-col py-4 gap-3">
        //                     <p className="font-bold">Color: Black</p>
        //                     <div className="flex gap-3">
        //                         <div className="h-5 w-5 rounded-full border-2 border-black"></div>
        //                         <div className="h-5 w-5 rounded-full border-2 border-black"></div>
        //                     </div>
        //                 </div>
        //                 <div className="flex flex-col py-4 gap-3">
        //                     <p className="font-bold">Size: Black</p>
        //                     <div className="flex gap-3">
        //                         <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">S</div>
        //                         <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">M</div>
        //                         <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">LG</div>
        //                         <div className="rounded-lg text-sm py-1 px-4 border-2 border-black">XL</div>
        //                     </div>
        //                 </div>
        //                 <p className="underline pt-3">Size Guide</p>
        //                 <div className="flex flex-col gap-3 py-4">
        //                     <Button text="Add to Bag" size="large" color='primary'></Button>
        //                     <Button text="Favorite ♡" size="large" color='secondary'></Button>
        //                 </div>
        //                 <p className="underline">View Product Details</p>
        //                 <ul className="list-disc px-5 text-lg py-3">
        //                     <li>Color Shown: Black</li>
        //                     <li>Model: Something</li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default ListingCard;