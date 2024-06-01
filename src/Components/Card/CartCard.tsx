import React from "react";
import {FaTrashAlt} from "react-icons/fa";
import {AppDispatch} from "../../store.ts";
import {useDispatch} from "react-redux";
import Menu from "../Menu";
import {toggleModal} from "../Menu/state.ts";
import ModalContent from "../Menu/ModalContent.tsx";
import Confirm from "../Menu/Confirm.tsx";
import {Link} from "react-router-dom";

const CartCard: React.FC<{ item: ICart.Item }> = ({item}) => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className="max-w-screen-md mx-auto flex gap-4 border-b-[1px] border-b-gray-400 py-6">
            <Link to={`/product/details/${item.id}`}>
                <img className="h-20 w-28" src={item.imgUrl} alt=""/>
            </Link>
            <div className="flex flex-col max-w-full w-full gap-2">
                <div className="flex justify-between">
                    <Link to={`/product/details/${item.id}`}>
                        <p className="font-bold">{item.title}</p>
                    </Link>
                    <p className="">{item.price}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="max-w-3xl text-zinc-500">{item.desc}</p>
                    <p className="text-indigo-500 font-semibold">{item.category}</p>
                    <p>{item.size}</p>
                    <div className="flex justify-between">
                        <p>x {item.quantity}</p>
                        <Menu
                            trigger={<FaTrashAlt onClick={() => dispatch(toggleModal())}
                                                 className="text-black cursor-pointer hover:scale-110"/>}
                            body={<ModalContent
                                content={<Confirm item={item}/>}
                            />}>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard;