import {createSlice} from '@reduxjs/toolkit'
import chair from "../../assets/chair.jpg";
import camera from "../../assets/camera.jpg";
import hpone from "../../assets/hpone.jpg";
import shoe from "../../assets/shoe.jpg";
import watch from "../../assets/watch.jpg";

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
            title: "Camera",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: camera,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
        },
        {
            id: '3',
            title: "Headphone",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: hpone,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
        },
        {
            id: '4',
            title: "Shoe",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: shoe,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
        },
        {
            id: '5',
            title: "Watch",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: watch,
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