import React from 'react';
import useIntersectionObserver from './useIntersectionObserver';

type LazyImage = {
    src: string;
    alt: string;
    className?: string
    onClick?: () => void;
}

const LazyImage: React.FC<LazyImage> = ({src, alt, className, onClick}) => {
    const {ref, isIntersecting, hasLoaded} = useIntersectionObserver({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });

    return (
        <img
            ref={ref}
            src={isIntersecting ? src : ''}
            data-src={src}
            alt={alt}
            onClick={onClick}
            className={`lazy-image ${isIntersecting || hasLoaded ? 'loaded' : 'loading'} ${className}`}
        />
    );
};

export default LazyImage;