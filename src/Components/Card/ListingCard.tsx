import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import LazyImage from "../../Services/lazy/lazyImage.tsx";

const ListingCard: React.FC<{ item: IProduct.Item }> = ({item}) => {
    const initialSelectedColor = item.colors[0]
    const [selectedColor, setSelectedColor] = useState<IProduct.Color | undefined>(initialSelectedColor);

    useEffect(() => {
        setSelectedColor(initialSelectedColor);
    }, []);

    return (
        <div className="max-w-screen-2xl mx-auto bg-white border-black overflow-hidden">
            <div className="md:flex flex-col">
                <Link to={`/product/details/${item.id}`}>
                    <LazyImage className="object-fill aspect-[3/5] w-fit md:w-full" src={item.imgUrl} alt={item.title}/>
                </Link>
                <div className="flex flex-col max-w-screen-2xl w-full text-sm ga1 pt-4 gap-1">
                    <div>
                        <div className="flex gap-3">
                            {item.colors.map((color, i) => (
                                <div
                                    key={i}
                                    className={`h-5 w-5 p-0.5 mb-2.5 bg-clip-content cursor-pointer rounded-full border-2 ${selectedColor === color ? 'border-red-600' : 'border-black'}`}
                                    style={{backgroundColor: color.color}}
                                    onClick={() => setSelectedColor(color)}
                                >
                                </div>
                            ))}
                        </div>
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Furniture
                        </div>
                        <Link to={`/product/details/${item.id}`}>
                            <a href="#" className="block leading-tight font-medium text-black hover:underline">
                                {item.title}</a>
                        </Link>
                        <p className="text-slate-500">{item.desc}</p>
                        <p className="text-rose-500 font-bold">${item.price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingCard;