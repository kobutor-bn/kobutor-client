import {createSlice} from '@reduxjs/toolkit'
import chair from "../../assets/chair.jpg";

const initialState: ICart.Items = {
    items: [
        {
            title: "Chair",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: chair,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
        },
        {
            title: "Chair",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: chair,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
        },
        {
            title: "Chair",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: chair,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
        },
        {
            title: "Chair",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: chair,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
        },
    ],
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: () => {
        },
        decrement: () => {
        },
        incrementByAmount: () => {
        },
    },
})

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = CartSlice.actions

export default CartSlice.reducer