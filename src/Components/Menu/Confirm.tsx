import React from 'react';
import Button from "../Button.tsx";
import {AppDispatch} from "../../store.ts";
import {useDispatch} from "react-redux";
import {toggleModal} from "./state.ts";
import {Remove} from "../../Pages/Cart/state.ts";

const Confirm: React.FC<{ item: IProduct.Item }> = ({item: item}) => {
    const dispatch: AppDispatch = useDispatch();

    const handleYesClick = () => {
        dispatch(Remove(item));
        dispatch(toggleModal());
    };

    return (
        <div className="flex w-full flex-col gap-8">
            <p className="text-lg text-center font-bold">Are you sure?</p>
            <div className="flex w-full gap-3">
                <Button onClick={() => dispatch(toggleModal())} text={'No'} color="secondary" size={'large'}/>
                <Button onClick={handleYesClick} text={'Yes'} color="primary" size={'large'}/>
            </div>
        </div>
    );
};

export default Confirm;