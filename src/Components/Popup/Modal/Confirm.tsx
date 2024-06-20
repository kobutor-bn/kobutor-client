import React from 'react';
import Button from "../../Button.tsx";
import {AppDispatch} from "../../../Services/store";
import {useDispatch} from "react-redux";
import {Remove} from "../../../Pages/Cart/Cart.ts";
import {toggleModal} from "../../../Services/store/slices/modal.ts";

const Confirm: React.FC<{ item: IProduct.Item }> = ({item: item}) => {
    const dispatch: AppDispatch = useDispatch();

    const handleYesClick = () => {
        dispatch(Remove(item));
        dispatch(toggleModal());
    };

    return (
        <div className="flex w-full flex-col gap-8">
            <p className="text-lg text-center font-bold">Are you sure?</p>
            <div className="flex flex-grow w-full gap-3">
                <Button onClick={() => dispatch(toggleModal())} className="w-full" text={'No'} color="secondary"
                        size={'large'}/>
                <Button onClick={handleYesClick} className="w-full" text={'Yes'} color="primary" size={'large'}/>
            </div>
        </div>


    );
};

export default Confirm;