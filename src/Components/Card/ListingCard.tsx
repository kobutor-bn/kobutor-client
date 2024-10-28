import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LazyImage from "../../Services/lazy/lazyImage.tsx";

const ListingCard: React.FC<{ item: IProduct.Item }> = ({ item }) => {
    const initialSelectedColor = item.colors ? Object.keys(item.colors)[0] : null;
    const [selectedColor, setSelectedColor] = useState<string | null>(initialSelectedColor);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(
        initialSelectedColor ? item.colors[initialSelectedColor] : undefined
    );

    useEffect(() => {
        if (initialSelectedColor) {
            setSelectedColor(initialSelectedColor);
            setSelectedImage(item.colors[initialSelectedColor]);
        }
    }, [initialSelectedColor, item.colors]);

    const handleColorClick = (color: string) => {
        setSelectedColor(color);
        setSelectedImage(item.colors[color]);
    };

    return (
        <div className="max-w-screen-2xl mx-auto bg-white border-black overflow-hidden">
            <div className="flex flex-col">
                <Link to={`/product/details/${item.id}`}>
                    {selectedImage ? (
                        <LazyImage className="object-fill w-full h-64 md:h-80" src={selectedImage} alt={item.title} />
                    ) : (
                        <div className="object-cover w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
                            No Image
                        </div>
                    )}
                </Link>
                <div className="flex flex-col max-w-screen-2xl w-full text-sm pt-4 gap-1">
                    <div>
                        <div className="flex flex-wrap gap-3">
                            {item.colors &&
                                Object.keys(item.colors).map((color, i) => (
                                    <div
                                        key={i}
                                        className={`h-5 w-5 p-0.5 mb-2.5 bg-clip-content cursor-pointer rounded-full border-2 ${
                                            selectedColor === color ? "border-red-600" : "border-black"
                                        }`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorClick(color)}
                                    ></div>
                                ))}
                        </div>
                        <div className="font-montserrat font-semibold uppercase tracking-wide text-sm text-indigo-500">
                            {item.category}
                        </div>
                        <Link to={`/product/details/${item.id}`}>
                            <span className="font-montserrat font-semibold block leading-tight text-black hover:underline">
                                {item.title}
                            </span>
                        </Link>
                        <p className="font-Nunito font-light text-slate-500">{item.desc}</p>
                        <p className="font-montserrat text-rose-500">${item.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;