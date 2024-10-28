import {createSlice} from '@reduxjs/toolkit'
import red1 from "../../../assets/1/red.jpg";
import black1 from "../../../assets/1/black.jpg";
import blue1 from "../../../assets/1/blue.jpg";
import brown1 from "../../../assets/1/brown.jpg";

import black2 from "../../../assets/2/black.jpg";
import brown2 from "../../../assets/2/brown.jpg";
import green2 from "../../../assets/2/green.jpg";
import pink2 from "../../../assets/2/pink.jpg";
import white2 from "../../../assets/2/white.jpg";
import blue2 from "../../../assets/2/skyblue.jpg";

import pink3 from "../../../assets/3/pink.jpg";
import white3 from "../../../assets/3/white.jpg";
import black3 from "../../../assets/3/black.jpg";
import brown3 from "../../../assets/3/brown.jpg";

import black4 from "../../../assets/4/black.jpg";
import brown4 from "../../../assets/4/brown.jpg";
import green4 from "../../../assets/4/green.jpg";
import pink4 from "../../../assets/4/pink.jpg";
import white4 from "../../../assets/4/white.jpg";
import red4 from "../../../assets/4/red.jpg";
import silver4 from "../../../assets/4/silver.jpg";
import yellow4 from "../../../assets/4/yellow.jpg";

import black5 from "../../../assets/5/black.jpg";
import blue5 from "../../../assets/5/blue.jpg";
import coffee5 from "../../../assets/5/coffee.jpg";
import green5 from "../../../assets/5/green.jpg";
import white5 from "../../../assets/6/white.jpg";
import white6 from "../../../assets/6/white.jpg";
import pink5 from "../../../assets/5/pink.jpg";

import pink6 from "../../../assets/6/pink.jpg";
import coffee6 from "../../../assets/6/coffee.jpg";

const initialState: IProduct.Items = {
    items: [
        {
            id: '1',
            title: "Elegant Handbag",
            category: "Women Bags",
            tags: [],
            desc: "A stylish and elegant handbag perfect for all occasions.",
            price: 120.99,
            colors: {
                '#ff0000': red1,
                '#000000': black1,
                '#00FFFF': blue1,
                '#7c3f00': brown1,
            },
        },
        {
            id: '2',
            title: "Vintage Leather Bag",
            category: "Women Bags",
            tags: [],
            desc: "A vintage-inspired leather bag with ample storage.",
            price: 89.99,
            colors: {
                '#000000': black2,
                '#7c3f00': brown2,
                '#90EE90': green2,
                '#FFC0CB': pink2,
                '#FFFFFF': white2,
                '#00FFFF': blue2,
            },
        },
        {
            id: '3',
            title: "Casual Tote Bag",
            tags: [],
            category: "Women Bags",
            desc: "A casual tote bag, ideal for everyday use.",
            price: 49.99,
            colors: {
                '#FFFFFF': white3,
                '#000000': black3,
                '#FFC0CB': pink3,
                '#7c3f00': brown3,
            },
        },
        {
            id: '4',
            title: "Classic Shoulder Bag",
            category: "Women Bags",
            tags: [],
            desc: "A classic shoulder bag with a timeless design.",
            price: 75.50,
            colors: {
                '#FFFFFF': white4,
                '#000000': black4,
                '#FFC0CB': pink4,
                '#7c3f00': brown4,
                '#90EE90': green4,
                '#ff0000': red4,
                '#C0C0C0': silver4,
                '#FFFF00': yellow4,
            },
        },
        {
            id: '5',
            title: "Trendy Backpack",
            category: "Women Bags",
            tags: [],
            desc: "A trendy backpack for modern women on the go.",
            price: 60.75,
            colors: {
                '#000000': black5,
                '#00FFFF': blue5,
                '#6f4e37': coffee5,
                '#90EE90': green5,
                '#FFC0CB': pink5,
                '#FFFFFF': white5,
            },
        },
        {
            id: '6',
            title: "Designer Clutch",
            category: "Women Bags",
            desc: "A designer clutch perfect for evening events.",
            price: 150.00,
            tags: [],
            colors: {
                '#6f4e37': coffee6,
                '#FFC0CB': pink6,
                '#FFFFFF': white6,
            },
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