import React from "react";
import {FaTrashAlt} from "react-icons/fa";
import {AppDispatch} from "../../Services/store";
import {useDispatch} from "react-redux";
import ModalContent from "../Popup/Modal/ModalContent.tsx";
import Confirm from "../Popup/Modal/Confirm.tsx";
import {Link} from "react-router-dom";
import Modal from "../Popup/Modal";
import {toggleModal} from "../../Services/store/slices/modal.ts";
import LazyImage from "../../Services/lazy/lazyImage.tsx";

const CartCard: React.FC<{ item: ICart.Item }> = ({item}) => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className="max-w-screen-md mx-auto flex gap-4 border-b-[1px] border-b-gray-400 py-6">
            <Link to={`/product/details/${item.id}`}>
                <LazyImage className="h-20 w-28" src={item.imgUrl} alt={""}/>
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
                    <div className="flex justify-between items-center">
                        <p className="text-red-500">&times; {item.quantity}</p>
                        <Modal
                            trigger={<FaTrashAlt onClick={() => dispatch(toggleModal())}
                                                 className="text-black cursor-pointer hover:scale-110"/>}
                            body={<ModalContent
                                content={<Confirm item={item}/>}
                            />}>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard;