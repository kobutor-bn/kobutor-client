import { useState, useEffect } from "react";
import LazyImage from "../../Services/lazy/lazyImage.tsx";
import {IProduct} from "../../Services/typings/Product";

interface UseCategoryMapProps {
    item: IProduct.Item;
}

export const useCategoryMap = ({ item }: UseCategoryMapProps) => {
    const initialSelectedColor = item.colors && item.colors.length > 0 ? item.colors[0].color : null;
    const initialSelectedImage = item.colors && item.colors.length > 0 ? item.colors[0].image : undefined;

    const [selectedColor, setSelectedColor] = useState<string | null>(initialSelectedColor);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(initialSelectedImage);

    useEffect(() => {
        selectInitial(item.category);
    }, []);

    const selectInitial = (category: string) => {
        switch (category) {
            case 'Electronics': {
                const initialSelectedImage = item.images && item.images.length > 0 ? item.images[0] : undefined;
                setSelectedImage(initialSelectedImage);
                return
            }
            case 'Women Bags': {
                const initialSelectedColor = item.colors && item.colors.length > 0 ? item.colors[0].color : undefined;
                const initialSelectedImage = item.colors && item.colors.length > 0 ? item.colors[0].image : undefined;
                setSelectedColor(initialSelectedColor!);
                setSelectedImage(initialSelectedImage);
                return;
            }
        }
    }

    const handleChange = (color: string, img: string) => {
        switch (item.category) {
            case 'Electronics':
                setSelectedImage(img);
                return;

            case 'Women Bags':
                setSelectedColor(color);
                setSelectedImage(img);
                return;
        }
    };

    const renderAttrByCategory = (category: string) => {
        switch (category) {
            case "Electronics":
                return null;
            case "Women Bags":
                return (
                    <div className="flex flex-wrap gap-3">
                        {item.colors?.map((colorObj, i) => (
                            <div
                                key={i}
                                className={`h-5 w-5 p-0.5 mb-2.5 cursor-pointer rounded-full border-2 ${
                                    selectedColor === colorObj.color ? "border-red-600" : "border-black"
                                }`}
                                style={{ backgroundColor: colorObj.color }}
                                onClick={() => handleChange(colorObj.color, colorObj.image)}
                            ></div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    const renderImgByCategory = (category: string) => {
        switch (category) {
            case "Electronics":
                return (
                    <LazyImage
                        className="object-fill w-full h-64 md:h-80"
                        key={item.id}
                        src={item.images[0]}
                        alt={item.title}
                    />
                );
            case "Women Bags":
                return (
                    <LazyImage
                        className="object-fill w-full h-64 md:h-80"
                        key={item.id}
                        src={selectedImage!}
                        alt={item.title}
                    />
                );
            default:
                return null;
        }
    };

    const renderImagesByCategory = (category: string) => {
        switch (category) {
            case "Electronics":
                return item.images.map((image: string, i) => (
                    <LazyImage
                        className="object-fill border-2 border-black w-full h-64 md:h-80"
                        key={`${item.id}-${i}`}
                        src={image}
                        alt={item.title}
                        onClick={() => handleChange(null, image)}
                    />
                ));
            case "Women Bags":
                return item.colors.map((colorObj: IProduct.Colors, i) => (
                    <LazyImage
                        className="object-fill border-2 border-black w-full h-64 md:h-80"
                        key={`${item.id}-${i}`}
                        src={colorObj.image}
                        alt={item.title}
                        onClick={() => handleChange(colorObj.color, colorObj.image)}
                    />
                ));
            default:
                return null;
        }
    };

    return {
        initialSelectedColor,
        initialSelectedImage,
        selectedColor,
        selectedImage,
        setSelectedColor,
        setSelectedImage,
        renderAttrByCategory,
        renderImgByCategory,
        renderImagesByCategory,
    };
};