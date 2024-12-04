import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../index.ts";

const initialState: IOrder.Item = {
    id: "",
    user_id: "",
    status: "Created",
    currency: "BDT",
    total_amount: 1,
    address: {
        id: '',
        user_id: '',
        detail: '',
        city: '',
        postal_code: '',
    },
    payment_details: {
        method: 'PLACEHOLDER_method',
        status: 'PLACEHOLDER_status',
        transaction_id: 'PLACEHOLDER_transaction_id'
    },
    products: [],
    created_at: "",
};

export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setItem: (state, action: PayloadAction<Partial<IOrder.Item>>) => {
            return {...state, ...action.payload};
        },
    },
});

export const {setItem} = OrderSlice.actions;
export const orderSelector = (state: RootState) => state.order;

export default OrderSlice.reducer;