import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../index.ts";

const initialState: ICart.Global = {
    cart: null
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<ICart.Item>) => {
            state.cart = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {setCart} = CartSlice.actions
export const cartSelector = (state: RootState) => state.cart.cart;
export default CartSlice.reducer