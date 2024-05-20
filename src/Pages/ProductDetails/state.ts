import {createSlice} from '@reduxjs/toolkit'
import chair from "../../assets/chair.jpg";

const initialState: IProduct.Items = {
    items: [
        {
            id: '1',
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
            id: '2',
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
            id: '3',
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
            id: '4',
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

export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
})

// Action creators are generated for each case reducer function
// export const {} = SearchState.actions

export default ProductSlice.reducer