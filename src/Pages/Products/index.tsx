import {images} from "./index.ts";
import {LuFilterX} from "react-icons/lu";
import ListingCard from "../../Components/Card/ListingCard.tsx";

function Products() {

    return (
        <>
            <p className="text-center bg-yellow-100 shadow-md py-4 px-0">
                Free Delivery, Member Exclusive Products and Promos for all our Members. <br/>
                <span className="underline font-bold">Join us!</span>
            </p>
            
            <div
                className="flex gap-5 md:justify-center text-center mx-auto md:flex-wrap whitespace-nowrap py-6 px-4 shadow-lg overflow-x-scroll">
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Leather Bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Vanity Bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Handbags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Satchel bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Crossbody bags</div>
                <div className="py-2 px-4 border-black border text-sm font-semibold rounded-lg">Shoulder bags</div>
            </div>

            {/*<Dropdown/>*/}
            <form className="relative px-4 flex w-fit text-lg text-left gap items-center">
                <select id="underline_select"
                        className="block py-2.5 pr-6 text-sm text-gray-500 bg-transparent border-0 border-b border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option selected>Sort By</option>
                    <option value="price">Price</option>
                    <option value="saab">Size</option>
                    <option value="mercedes">Color</option>
                    <option value="audi"></option>
                </select>
                <LuFilterX className="absolute right-4 top-1/2 transform -translate-y-1/2"/>
            </form>

            <div className="max-w-screen-2xl mx-auto p-4 py-8">
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {images.map((image, i) => {
                        return (
                            <ListingCard
                                key={i}
                                title={"Chair"}
                                desc={"A fucking Chair"}
                                imgUrl={image.url}
                                price={0}
                                size={"fixed"}
                            ></ListingCard>
                        );
                    })}
                </div>
            </div>
        </>
    )
}

export default Products;