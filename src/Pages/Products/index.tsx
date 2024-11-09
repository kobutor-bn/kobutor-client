import {useEffect, useRef, useState} from "react";
import {IDropDown} from "../../Services/typings/Dropdown";
import {useLazyProducts} from "../../Services/store/hooks/products.ts";
import Loading from "../../Components/Loading";
import {useTags} from "../../Services/store/hooks/tags.ts";
import ListingCard from "../../Components/Card/ListingCard.tsx";
import Dropdown from "../../Components/Dropdown";
import {Category} from "../../Services/typings/Enums.ts";

function Products() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedTags, setSelectedTag] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const {
        fetchProducts: queryProducts,
        products,
        isFetching: isProductsLoading,
        error: productError
    } = useLazyProducts();
    const {tags, isLoading: isTagsLoading, error: tagError}
        = useTags('');

    useEffect(() => {
        queryProducts({
            category: selectedCategory,
            // price: 5,
        }, true);
    }, [selectedTags, selectedCategory]);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const selectOption = (option: IDropDown.Option) => {
        setSelectedCategory(option.value);
        setIsOpen(false);
        queryProducts({
            category: selectedCategory,
            // price: 5,
        }, true);
        console.log(queryProducts);
    };

    const categories = [
        {label: 'All', value: ''},
        {label: 'Women Bags', value: Category.WomenBags},
        {label: 'Electronics', value: Category.Electronics},
    ];

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


    const Button = () =>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-5 py-2 px-4 border border-gray-400 rounded-sm focus:outline-none"
        >
            {selectedCategory ? selectedCategory : 'Select Category'}
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
                    {categories.map((option: IDropDown.Option) => (
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

    const sort = (tag: string) => {
        setSelectedTag((prevState) => {
            const updatedTags = [...prevState, tag]
            queryProducts({
                category: selectedCategory,
                // price: 5,
            }, true);
            return updatedTags;
        });
    }

    const isLoading = isProductsLoading || isTagsLoading;
    const error = productError || tagError
    if (isLoading) return <Loading/>;
    if (error) console.log(error)
    // if (error) return <Error error={ error } />;

    return (
        <>
            <div
                className="font-Nunito flex gap-5 md:justify-center text-center mx-auto md:flex-wrap whitespace-nowrap py-6 px-4 shadow-lg overflow-x-scroll">
                {tags?.map((tag: ITag.Item) => (
                    <div
                        key={tag.id}
                        onClick={() => sort(tag.name)}
                        className={`py-2 px-4 border-black border text-sm font-semibold capitalize rounded-lg 
                    ${selectedTags.includes(tag.name) ? "brightness-50" : ""} `}>{tag.name}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-8 max-w-screen-2xl mx-auto py-8 px-2.5 pt-4">
                <Dropdown
                    btn={<Button/>}
                    body={<Options/>}
                    isOpen={isOpen}
                    options={categories}
                    selectOption={selectOption}/>

                <div
                    className="grid grid-cols-2 gap-x-2.5 text-wrap gap-y-10 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
                    {products.map((product: IProduct.Item) => {
                        return (
                            <ListingCard
                                key={product.id}
                                item={product}/>
                        );
                    })}
                </div>

            </div>
        </>
    )
}

export default Products;