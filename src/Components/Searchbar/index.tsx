import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../Services/store';
import {
    addRecentSearch,
    addRecentSearchFromStorage,
    clearSearchHistory,
    setFocus,
    updateQuery,
} from '../../Services/store/slices/searchBar';
import {IoIosSearch} from 'react-icons/io';
import {Link, useNavigate} from "react-router-dom";
import {useLazyProducts} from "../../Services/store/hooks/products.ts";
import Error from "../../Pages/Error.tsx";
import Loading from "../../Components/Loading";

const SearchBar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Synchronize search results with animation
    const [showResults, setShowResults] = useState(false);
    const animationDuration = 300; // match the duration of the CSS transition

    // Redux state
    const isFocused = useSelector((state: RootState) => state.search.isFocused);
    const recentSearches = useSelector((state: RootState) => state.search.recentSearches);
    const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
    const {fetchProducts, products, isFetching, error} = useLazyProducts();

    useEffect(() => {
        dispatch(addRecentSearchFromStorage());
    }, [dispatch]);

    useEffect(() => {
        if (isFocused) {
            setTimeout(() => setShowResults(true), animationDuration);
        } else {
            setShowResults(false);
        }
    }, [isFocused]);

    const closeOverlayOnOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
            dispatch(setFocus(false));
        }
    };

    const saveIfExactMatch = () => {
        const exactMatch = products.find(
            product => product.title.toLowerCase() === searchQuery.toLowerCase()
        );
        if (exactMatch) dispatch(addRecentSearch(exactMatch));
    };

    const handleProductSelect = (product: IProduct.Item) => {
        dispatch(updateQuery(''));
        dispatch(setFocus(false));
        dispatch(addRecentSearch(product));
        inputRef.current && (inputRef.current.value = '');
        navigate(`/product/details/${product.id}`);
    };

    const filteredProducts = searchQuery
        ? products.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    if (error) return <Error error={error}/>;

    return (
        <div className="relative z-10">
            {isFocused && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10"
                    onClick={closeOverlayOnOutsideClick}
                >
                    <div
                        ref={overlayRef}
                        className="relative w-3/4 bg-white rounded-lg shadow-lg p-4 max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {showResults && (
                            <>
                                <p className="p-3 font-bold text-gray-600">
                                    {searchQuery ? 'Search Results' : 'Recent Searches'}
                                </p>

                                {isFetching ? (
                                    <Loading/>
                                ) : (
                                    <div className="px-3 pb-3">
                                        <div className="flex flex-col gap-2 font-medium">
                                            {(searchQuery ? filteredProducts : recentSearches).map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleProductSelect(item)}
                                                    className="bg-[#FFB347] hover:bg-gray-200 rounded-lg px-4 py-2 cursor-pointer transition-colors"
                                                >
                                                    {item.title}
                                                </div>
                                            ))}
                                        </div>

                                        {filteredProducts.length > 0 && (
                                            <Link to="/product/listing">
                                                <button
                                                    className="mt-4 p-2 w-full text-center bg-gray-200 hover:bg-gray-300 rounded-lg text-blue-600 font-semibold transition-colors"
                                                >
                                                    Show All Results
                                                </button>
                                            </Link>
                                        )}

                                        {!searchQuery && recentSearches.length > 0 && (
                                            <button
                                                className="mt-4 p-2 text-center text-red-600 underline font-medium"
                                                onClick={() => dispatch(clearSearchHistory())}
                                            >
                                                Clear Recent Searches
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            <div
                className={`transition-all duration-${animationDuration} ${isFocused ? 'fixed top-4 left-1/2 w-3/4 transform -translate-x-1/2' : 'relative w-full'}`}>
                <IoIosSearch className="absolute left-2 bottom-2 text-black h-6 w-6"/>

                <input
                    type="text"
                    placeholder="Search"
                    ref={inputRef}
                    className={`p-2 pl-10 border rounded-full transition-all duration-${animationDuration} ${isFocused ? 'w-full border-b border-amber-200' : 'border-black'} `}
                    onFocus={() => dispatch(setFocus(true))}
                    onChange={(e) => {
                        const query = e.target.value;
                        dispatch(updateQuery(query));
                        fetchProducts({title: query});
                    }}
                    onBlur={saveIfExactMatch}
                />
            </div>
        </div>
    );
};

export default SearchBar;