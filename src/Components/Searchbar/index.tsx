// SearchBar.tsx
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../Services/store';
import {
    clearRecentSearches,
    handleInputFocus,
    handleOverlayClick,
    loadRecentSearches,
    saveRecentSearch,
    setIsFocused,
    setSearchQuery
} from '../../Services/store/slices/searchBar';
import {IoIosSearch} from 'react-icons/io';
import {useNavigate} from "react-router-dom";

const SearchBar: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const isFocused = useSelector((state: RootState) => state.search.isFocused);
    const recentSearches = useSelector((state: RootState) => state.search.recentSearches);
    const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
    const products = useSelector((state: RootState) => state.products.items);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadRecentSearches());
    }, [dispatch]);

    const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (overlayRef.current && overlayRef.current.contains(e.target as Node)) {
            dispatch(setIsFocused(false));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const handleInputBlur = () => {
        // Save the search query only if it matches a product title
        const matchedProduct = products.find(product =>
            product.title.toLowerCase() === searchQuery.toLowerCase()
        );
        if (matchedProduct) {
            dispatch(saveRecentSearch(matchedProduct));
        }
    };

    const handleProductClick = (product: IProduct.Item) => {
        dispatch(setSearchQuery(product.title));
        dispatch(saveRecentSearch(product));
        dispatch(setSearchQuery(''));
        dispatch(setIsFocused(false));
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        navigate(`/product/details/${product.id}`);
    };

    const handleClearSearches = () => {
        dispatch(clearRecentSearches());
    };

    const filteredProducts = searchQuery ? products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className="relative z-10">
            {isFocused && (
                <div
                    className="whitebg fixed inset-0 bg-white transition-all duration-300 h-1/2"
                    ref={overlayRef}
                />
            )}

            <div
                className={`transform transition-all duration-300 ${isFocused ? 'fixed top-4 left-1/2 -translate-x-1/2 w-3/4' : 'relative w-full'}`}
            >
                <IoIosSearch
                    className="absolute bottom-2 left-2 text-black h-6 w-6 2xl:bottom-3 2xl:left-3 2xl:h-7 2xl:w-7"/>
                <input
                    placeholder="Search"
                    type="text"
                    className={`p-2 border rounded-3xl pl-10 transition-all duration-300 appearance-none w-full bg-transparent border-b border-black focus:border-amber-200 focus:border-b ${isFocused ? 'w-full' : 'w-auto'} 2xl:pl-12`}
                    onFocus={() => dispatch(handleInputFocus())}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    ref={inputRef} // Assign ref to the input element
                />
                {isFocused && (
                    <div className="absolute">
                        <p className="p-3 font-bold ">{searchQuery ? 'Search Results' : 'Recent Searches'}</p>
                        <div className={`flex ${searchQuery ? 'flex-col' : ''} gap-5 font-medium px-3`}>
                            {searchQuery ? filteredProducts.map((item) => (
                                <div key={item.id} onClick={() => handleProductClick(item)}>
                                    {item.title}
                                </div>
                            )) : recentSearches.map((search, index) => (
                                <div className="bg-neutral-300 px-3 py-0.5 rounded-xl" key={index}
                                     onClick={() => handleProductClick(search)}>
                                    {search.title}
                                </div>
                            ))}
                        </div>
                        {!searchQuery && recentSearches.length > 0 && (
                            <button
                                className="mt-6 ml-2 p-2 underline text-blue-500"
                                onClick={handleClearSearches}
                            >
                                Clear &times;
                            </button>
                        )}
                    </div>
                )}
            </div>
            {isFocused && (
                <div
                    className="fixed inset-x-0 bottom-0 bg-gray-900 bg-opacity-50 h-1/2"
                    onMouseDown={handleOverlayMouseDown}
                    onClick={() => dispatch(handleOverlayClick())}
                />
            )}
        </div>
    );
};

export default SearchBar;