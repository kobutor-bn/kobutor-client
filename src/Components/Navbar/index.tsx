import './index.css';
import {Link} from "react-router-dom";
import Menu from "../Menu";
import MenuContent from "../Menu/MenuContent.tsx";
import {CiShop} from "react-icons/ci";
import {PiHandbagBold, PiUserCircleGear} from "react-icons/pi";
import {MdOutlineFavoriteBorder} from "react-icons/md";
import SearchBar from "../Searchbar";
import Dropdown from "../Dropdown";
import {IDropDown} from "../../Services/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";
import {selectOption} from "../Dropdown/state.ts";
import {toggleMenu, toggleModal} from "../Menu/state.ts";
import ModalContent from "../Menu/ModalContent.tsx";

function Navbar() {
    const dispatch: AppDispatch = useDispatch();
    const options = useSelector((state: RootState) => state.dropdown.options);
    const isDDOpen = useSelector((state: RootState) => state.dropdown.isOpen)
    const isMenuOpen = useSelector((state: RootState) => state.menu.isMenuOpen)

    const Button = () =>
        <div className="flex gap-3">
            {/*<div className="flex gap-3" onClick={() => dispatch(toggleIsOpen())}>*/}
            <PiUserCircleGear className="text-white h-6 w-6"/>
            <Link to={'/login'}>
                <li>SIGN IN</li>
            </Link>
        </div>

    const Options = () =>
        <>
            {isDDOpen && (
                <div
                    className="absolute bg-yellow-50 top-full left-0 -mt-0.5 w-full border border-black  shadow-lg z-10">
                    {options.map((option: IDropDown.Option) => (
                        <div
                            key={option.value}
                            className="border-b border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </>

    const MenuTrigger = () =>
        <div
            className={`flex flex-col justify-center items-center w-7 h-5 gap-2 cursor-pointer md:hidden menu-icon ${isMenuOpen ? "clicked" : ""}`}
            onClick={() => dispatch(toggleMenu())}
        >
                            <span
                                className="w-full h-[2px] bg-white menu-line transition-transform duration-500"></span>
            <span
                className="w-full h-[2px] bg-white menu-line transition-transform duration-500"></span>
        </div>

    return (
        <div className="w-screen ">
            <div className="flex flex-col shadow-xl">
                <div className="bg-[#252525]">
                    <nav
                        className="flex z-50 max-w-screen-2xl mx-auto justify-between items-center w-full text-white p-3">
                        <Link to={"/home"}>LOGO</Link>

                        <ul className="hidden items-center md:flex gap-5">
                            <div className="flex gap-3">
                                <CiShop className="text-white h-6 w-6"/>
                                <Link to={'/product/listing'}>SHOP</Link>
                            </div>
                            <div className="h-full w-[1px] py-4 bg-white"></div>
                            <Dropdown
                                btn={<Button/>}
                                body={<Options/>}
                                isOpen={isDDOpen}
                                options={options}
                                selectOption={() => dispatch(selectOption())}/>
                            {/*<Theme></Theme>*/}
                        </ul>

                        <Menu
                            trigger={<MenuTrigger/>}
                            body={<MenuContent/>}>
                        </Menu>
                    </nav>
                </div>

                <div className="bg-white">
                    <nav
                        className="flex items-center w-full max-w-screen-2xl  mx-auto justify-between p-3 ">
                        <div className="font-bold text-lg">KOBUTOR</div>
                        <ul className="flex items-center md:gap-8 gap-3">
                            <div className="hidden md:flex">
                                <SearchBar/>
                            </div>

                            <Menu
                                trigger={<MdOutlineFavoriteBorder onClick={() => dispatch(toggleModal())}
                                                                  className="text-rose-500 h-6 w-6"/>}
                                body={<ModalContent/>}>
                            </Menu>
                            <Link to={"/cart"}>
                                <PiHandbagBold className="text-black h-6 w-6"/>
                            </Link>
                        </ul>
                        {/*<Theme></Theme>*/}
                    </nav>
                </div>
            </div>
            <p className="text-center py-5 bg-yellow-100 shadow-lg">
                Free Delivery, Member Exclusive Products and Promos for all our Members. <br/>
                <span className="underline font-bold">Join us!</span>
            </p>
        </div>
    )


}

export default Navbar;