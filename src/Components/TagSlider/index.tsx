import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './index.css';
import { useTag, useTaggedProducts } from "../../Services/store/hooks/tags.ts";
import Loading from "../Loading";
import Error from "../../Pages/Error.tsx";
import { Link } from "react-router-dom";
import LazyImage from "../../Services/lazy/lazyImage.tsx";
import { Tag } from "../../Services/typings/Enums.ts";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

const ProductCard = React.memo(({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    const imageUrl =
        product.category === "Electronics"
            ? product.images?.[0]
            : product.colors?.[0]?.image;

    return (
        <div
            className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/product/details/${product.id}`} className="block relative overflow-hidden aspect-square">
                <LazyImage
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    src={imageUrl}
                    alt={product.title}
                />

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Quick View
                    </span>
                </div>
            </Link>

            {/* Wishlist Button */}
            <button
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10"
                onClick={(e) => {
                    e.preventDefault();
                    // wishlist logic
                }}
            >
                {isHovered ? (
                    <HiHeart className="h-5 w-5 text-rose-500" />
                ) : (
                    <HiOutlineHeart className="h-5 w-5 text-gray-600" />
                )}
            </button>

            {/* Product Info */}
            <div className="p-4 2xl:p-6 space-y-2">
                <Link to={`/product/details/${product.id}`}>
                    <h3 className="font-montserrat font-bold text-base 2xl:text-2xl text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <p className="font-montserrat uppercase tracking-wide text-xs 2xl:text-lg text-blue-600 font-semibold">
                    {product.category}
                </p>
                <div className="flex items-center justify-between pt-2">
                    <p className="font-Nunito text-xl 2xl:text-3xl font-bold text-gray-900">
                        €{product.price.toFixed(2)}
                    </p>
                    <Link
                        to={`/product/details/${product.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm 2xl:text-lg font-semibold transition-colors"
                    >
                        View
                    </Link>
                </div>
            </div>

            {/* Badges */}
            {(product.isNew || product.onSale) && (
                <div className="absolute top-4 left-4 flex gap-2">
                    {product.isNew && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            NEW
                        </span>
                    )}
                    {product.onSale && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            SALE
                        </span>
                    )}
                </div>
            )}
        </div>
    );
});

const TagSlider: React.FC<ICommon.SliderProps> = (props) => {
    const { id, title } = props;
    const { tag, isLoading: isTagLoading, error: isTagError } = useTag(id!);
    const { tagProducts, isLoading: isProductsLoading, error: isProductsError } = useTaggedProducts(id!);

    const error = isTagError || isProductsError;
    const isLoading = isTagLoading || isProductsLoading;

    if (isLoading) return <Loading />;
    if (error) return <Error error={error} />;

    const layoutWithAttr = () =>
        tagProducts
            ?.filter(
                (product) =>
                    (product.category === "Electronics" && product.images?.[0]) ||
                    (product.category === "Women Bags" && product.colors?.[0]?.image)
            )
            .map((product: any, i: number) => (
                <SwiperSlide key={i} className="pb-8">
                    <ProductCard product={product} />
                </SwiperSlide>
            ));

    const layoutWithoutAttr = () =>
        tagProducts
            ?.filter(
                (product) =>
                    (product.category === "Electronics" && product.images?.[0]) ||
                    (product.category === "Women Bags" && product.colors?.[0]?.image)
            )
            .map((product: any, i: number) => (
                <SwiperSlide key={i} className="pb-8">
                    <Link to={`/product/details/${product.id}`} className="block">
                        <div className="relative group overflow-hidden rounded-xl shadow-lg">
                            {product.category === "Electronics" ? (
                                <LazyImage
                                    className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-500"
                                    src={product.images[0]}
                                    alt={product.title}
                                />
                            ) : (
                                <LazyImage
                                    className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-500"
                                    src={product.colors[0].image}
                                    alt={product.title}
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </Link>
                </SwiperSlide>
            ));

    const render = (tagName: string) => {
        switch (tagName) {
            case Tag.BestSeller:
                return layoutWithAttr();
            case Tag.FeaturedThisWeek:
                return layoutWithoutAttr();
            default:
                return <></>;
        }
    };

    return (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 xl:mb-32 mb-24 2xl:mb-40">
            <div className="mb-8 2xl:mb-12">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl 2xl:text-6xl text-gray-900">
                    {title}
                </h2>
                <div className="h-1 w-24 bg-blue-600 mt-3 2xl:w-32 2xl:h-1.5"></div>
            </div>

            <Swiper
                slidesPerView={1.25}
                spaceBetween={20}
                navigation={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper !pb-4"
                breakpoints={{
                    320: { slidesPerView: 1.15, spaceBetween: 15 },
                    640: { slidesPerView: 1.5, spaceBetween: 20 },
                    768: { slidesPerView: 2.25, spaceBetween: 25 },
                    1024: { slidesPerView: 2.75, spaceBetween: 30 },
                    1440: { slidesPerView: 3.5, spaceBetween: 30 },
                    1920: { slidesPerView: 4, spaceBetween: 35 },
                }}
            >
                {render(tag!.name)}
            </Swiper>
        </section>
    );
};

export default TagSlider;