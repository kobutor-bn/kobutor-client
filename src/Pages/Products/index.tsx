import ListingCard from "../../Components/Card/ListingCard.tsx";
import Dropdown from "../../Components/Dropdown";
import {useEffect, useRef, useState} from "react";
import {IDropDown} from "../../Services/Dropdown";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";

function Products() {
    const products = useSelector((state: RootState) => state.products.items)
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IDropDown.Option | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option: IDropDown.Option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const options = [
        {label: 'Best Selling', value: 'option1'},
        {label: 'Trending Products', value: 'option2'},
        {label: 'This Month', value: 'option3'},
    ];

    const Button = () =>
        <button
            onClick={toggleDropdown}
            className="flex items-center gap-5 py-2 px-4 border border-gray-400 rounded-sm focus:outline-none"
        >
            {selectedOption ? selectedOption.label : 'Select Category'}
            {/*<LuFilterX/>*/}
            <svg
                className="h-5 w-5 ml-2 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </button>

    const Options = () =>
        <>
            {isOpen && (
                <div ref={dropdownRef}
                     className="absolute bg-white w-48 top-full left-0 -mt-0.5 border border-black shadow-lg">
                    {options.map((option: IDropDown.Option) => (
                        <div
                            key={option.value}
                            onClick={() => selectOption(option)}
                            className="border-b border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </>

    return (
        <>
            <div
                className="flex gap-5 md:justify-center text-center mx-auto md:flex-wrap whitespace-nowrap py-6 px-4 shadow-lg overflow-x-scroll">
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Leather Bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Vanity Bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Handbags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Satchel bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Crossbody bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Shoulder bags</div>
            </div>

            <div className="flex flex-col gap-8 max-w-screen-2xl mx-auto p-4 py-8 pt-4">
                {/*<Dropdown/>*/}
                <Dropdown
                    btn={<Button/>}
                    body={<Options/>}
                    isOpen={isOpen}
                    options={options}
                    selectOption={selectOption}/>
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product, i) => {
                        return (
                            <ListingCard
                                key={i}
                                item={product}
                            ></ListingCard>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Products;