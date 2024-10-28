import React from 'react';
import Button from "../../Button.tsx";
import {AppDispatch} from "../../../Services/store";
import {useDispatch} from "react-redux";
import {Remove} from "../../../Services/store/slices/Cart.ts";
import {toggleModal} from "../../../Services/store/slices/modal.ts";

const Confirm: React.FC<{ item: ICart.Item }> = ({item}) => {
    const dispatch: AppDispatch = useDispatch();

    const handleYesClick = () => {
        dispatch(Remove({id: item.id, selectedColor: item.selectedColor}));
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