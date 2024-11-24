import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation, Pagination} from 'swiper/modules';
import './index.css';
import {useTag, useTaggedProducts} from "../../Services/store/hooks/tags.ts";
import Loading from "../Loading";
import Error from "../../Pages/Error.tsx";
import {Link} from "react-router-dom";
import LazyImage from "../../Services/lazy/lazyImage.tsx";
import {Tag} from "../../Services/typings/Enums.ts";

const TagSlider: React.FC<ICommon.SliderProps> = (props) => {
    const {id, title} = props;
    const {tag, isLoading: isTagLoading, error: isTagError} = useTag(id!);
    const {tagProducts, isLoading: isProductsLoading, error: isProductsError} = useTaggedProducts(id!);
    const error = (isTagError || isProductsError);
    const isLoading = (isTagLoading || isProductsLoading);

    if (isLoading) return <Loading/>;
    if (error) return <Error error={error}/>;

    const layoutWithAttr = () => {
        return tagProducts?.filter(product =>
            (product.category === "Electronics" && product.images?.[0]) ||
            (product.category === "Women Bags" && product.colors?.[0]?.image)
        )
            .map((product, i) => (
                <SwiperSlide key={i} className="swiperSlide">
                    <Link to={`/product/details/${product.id}`}>
                        {product.category === "Electronics" ? (
                            <LazyImage
                                className="sliderImg 2xl:mb-3.5"
                                key={product.id}
                                src={product.images[0]}
                                alt={product.title}
                            />
                        ) : (
                            <LazyImage
                                className="sliderImg 2xl:mb-3.5"
                                key={product.id}
                                src={product.colors[0].image}
                                alt={product.title}
                            />
                        )}
                    </Link>

                    <div className="textContainer 2xl:gap-3">
                        <Link to={`/product/details/${product.id}`}>
                            <p className="font-montserrat font-bold 2xl:text-5xl">{product.title}</p>
                        </Link>
                        <p className="font-montserrat uppercase tracking-wide 2xl:text-3xl text-sm text-indigo-500 font-semibold">{product.category}</p>
                        <p className="font-Nunito mt-2 2xl:text-xl">USD ${product.price}</p>
                    </div>
                </SwiperSlide>
            ))
    };

    const layoutWithoutAttr = () => {
        return tagProducts?.filter(product =>
            (product.category === "Electronics" && product.images?.[0]) ||
            (product.category === "Women Bags" && product.colors?.[0]?.image)
        )
            .map((product, i) => (
                <SwiperSlide key={i} className="swiperSlide">
                    <Link to={`/product/details/${product.id}`}>
                        {product.category === "Electronics" ? (
                            <LazyImage
                                className="sliderImg 2xl:mb-3.5"
                                key={product.id}
                                src={product.images[0]}
                                alt={product.title}
                            />
                        ) : (
                            <LazyImage
                                className="sliderImg 2xl:mb-3.5"
                                key={product.id}
                                src={product.colors[0].image}
                                alt={product.title}
                            />
                        )}
                    </Link>
                </SwiperSlide>
            ));
    };

    const render = (tag: string) => {
        switch (tag) {
            case Tag.BestSeller:
                return layoutWithAttr();
            case Tag.FeaturedThisWeek:
                return layoutWithoutAttr();
            default:
                return <></>
        }
    }

    return (
        <div className="md:p-4 pr-0 xl:mb-28 mb-20">
            <p className="font-montserrat font-semibold text-2xl 2xl:text-5xl py-6 px-2">{title}</p>
            <Swiper
                slidesPerView={1.25}
                spaceBetween={15}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                    1024: {
                        slidesPerView: 1.75,
                        spaceBetween: 30,
                    },
                    1440: {
                        slidesPerView: 2.25,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 1.50,
                        spaceBetween: 30,
                    },
                    320: {
                        slidesPerView: 1.15,
                        spaceBetween: 15,
                    },
                }}
            >
                {render(tag!.name)}
            </Swiper>
        </div>
    );
};

export default TagSlider;