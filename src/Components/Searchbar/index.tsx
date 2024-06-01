import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store.ts';
import {handleInputFocus, handleOverlayClick, setIsFocused} from './state.ts';
import {IoIosSearch} from 'react-icons/io';

const SearchBar: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const isFocused = useSelector((state: RootState) => state.search.isFocused);
    const items = useSelector((state: RootState) => state.search.items);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (overlayRef.current && overlayRef.current.contains(e.target as Node)) {
            dispatch(setIsFocused(false));
        }
    };

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
                <IoIosSearch className="absolute bottom-2 left-2 text-black h-6 w-6"/>
                <input
                    placeholder="Search"
                    type="text"
                    className={`p-2 border rounded-3xl pl-10 transition-all duration-300 appearance-none w-full bg-transparent border-b border-black focus:border-amber-200 focus:border-b ${isFocused ? 'w-full' : 'w-auto'}`}
                    onFocus={() => dispatch(handleInputFocus())}
                />
                {isFocused && (
                    <div className="absolute">
                        <p className="p-3 font-bold ">Search Results</p>
                        <div className="flex flex-col gap-3 font-medium px-3">
                            {items.map((item) => {
                                return <div className="">
                                    {item.title}
                                </div>
                            })}
                        </div>
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