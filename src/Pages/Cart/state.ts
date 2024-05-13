import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface CartState {
    value: number
}

const initialState: CartState = {
    value: 0,
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = CartSlice.actions

export default CartSlice.reducer