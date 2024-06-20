import {createSlice} from '@reduxjs/toolkit'
import watch from "../../../assets/watch.jpg";
import one from "../../../assets/sample/1.jpg";
import two from "../../../assets/sample/2.jpg";
import three from "../../../assets/sample/3.jpg";
import four from "../../../assets/sample/4.jpg";
import five from "../../../assets/sample/5.jpg";

const initialState: IProduct.Items = {
    items: [
        {
            id: '1',
            title: "Chair",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: one,
            price: 46.34,
            quantity: 4,
            size: "Big",
            colors: [
                {
                    color: '#000',
                    images: [
                        {imgUrl: one},
                        {imgUrl: three},
                        {imgUrl: watch},
                        {imgUrl: two},
                        {imgUrl: five},
                        {imgUrl: four},
                    ],
                },
                {
                    color: '#00FFFF',
                    images: [
                        {imgUrl: two},
                        {imgUrl: five},
                        {imgUrl: three},
                        {imgUrl: watch},
                        {imgUrl: four},
                        {imgUrl: one},
                    ],
                },
                {
                    color: '#0000FF',
                    images: [
                        {imgUrl: two},
                        {imgUrl: three},
                        {imgUrl: watch},
                        {imgUrl: one},
                        {imgUrl: four},
                        {imgUrl: five},
                    ],
                },
                {
                    color: '#FFC0CB',
                    images: [
                        {imgUrl: two},
                        {imgUrl: watch},
                        {imgUrl: four},
                        {imgUrl: three},
                        {imgUrl: one},
                        {imgUrl: five},
                    ],
                }
            ],
            stock: 6,
        },
        {
            id: '2',
            title: "Camera",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: two,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
            colors: [
                {
                    color: '#000',
                    images: [
                        {imgUrl: two},
                        {imgUrl: three},
                        {imgUrl: one},
                        {imgUrl: four},
                        {imgUrl: five},
                        {imgUrl: watch},
                    ],
                },
                {
                    color: '#00FFFF',
                    images: [
                        {imgUrl: two},
                        {imgUrl: watch},
                        {imgUrl: five},
                        {imgUrl: one},
                        {imgUrl: three},
                        {imgUrl: four},
                    ],
                },
                {
                    color: '#0000FF',
                    images: [
                        {imgUrl: three},
                        {imgUrl: two},
                        {imgUrl: one},
                        {imgUrl: four},
                        {imgUrl: five},
                        {imgUrl: watch},
                    ],
                },
                {
                    color: '#FFC0CB',
                    images: [
                        {imgUrl: two},
                        {imgUrl: one},
                        {imgUrl: three},
                        {imgUrl: five},
                        {imgUrl: watch},
                        {imgUrl: four},
                    ],
                }
            ],
        },
        {
            id: '3',
            title: "Headphone",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: watch,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
            colors: [
                {
                    color: '#000',
                    images: [
                        {imgUrl: watch},
                        {imgUrl: two},
                        {imgUrl: one},
                        {imgUrl: three},
                        {imgUrl: four},
                        {imgUrl: five},
                    ],
                },
                {
                    color: '#00FFFF',
                    images: [
                        {imgUrl: four},
                        {imgUrl: two},
                        {imgUrl: three},
                        {imgUrl: one},
                        {imgUrl: five},
                        {imgUrl: watch},
                    ],
                },
                {
                    color: '#0000FF',
                    images: [
                        {imgUrl: four},
                        {imgUrl: two},
                        {imgUrl: three},
                        {imgUrl: five},
                        {imgUrl: watch},
                        {imgUrl: one},
                    ],
                },
                {
                    color: '#FFC0CB',
                    images: [
                        {imgUrl: four},
                        {imgUrl: three},
                        {imgUrl: one},
                        {imgUrl: two},
                        {imgUrl: watch},
                        {imgUrl: five},
                    ],
                }
            ],
        },
        {
            id: '4',
            title: "Shoe",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: four,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
            colors: [
                {
                    color: '#000',
                    images: [
                        {imgUrl: four},
                        {imgUrl: two},
                        {imgUrl: one},
                        {imgUrl: three},
                        {imgUrl: watch},
                        {imgUrl: five},
                    ],
                },
                {
                    color: '#00FFFF',
                    images: [
                        {imgUrl: watch},
                        {imgUrl: two},
                        {imgUrl: three},
                        {imgUrl: one},
                        {imgUrl: four},
                        {imgUrl: five},
                    ],
                },
                {
                    color: '#0000FF',
                    images: [
                        {imgUrl: three},
                        {imgUrl: watch},
                        {imgUrl: two},
                        {imgUrl: five},
                        {imgUrl: one},
                        {imgUrl: four},
                    ],
                },
                {
                    color: '#FFC0CB',
                    images: [
                        {imgUrl: two},
                        {imgUrl: watch},
                        {imgUrl: one},
                        {imgUrl: four},
                        {imgUrl: three},
                        {imgUrl: five},
                    ],
                }
            ],
        },
        {
            id: '5',
            title: "Watch",
            category: "Furniture",
            desc: "Whatever description of products goes here",
            imgUrl: five,
            price: 46.34,
            quantity: 4,
            size: "Big",
            stock: 6,
            colors: [
                {
                    color: '#000',
                    images: [
                        {imgUrl: five},
                        {imgUrl: two},
                        {imgUrl: three},
                        {imgUrl: one},
                        {imgUrl: four},
                        {imgUrl: watch},
                    ],
                },
                {
                    color: '#00FFFF',
                    images: [
                        {imgUrl: two},
                        {imgUrl: watch},
                        {imgUrl: three},
                        {imgUrl: four},
                        {imgUrl: one},
                        {imgUrl: five},
                    ],
                },
                {
                    color: '#0000FF',
                    images: [
                        {imgUrl: two},
                        {imgUrl: three},
                        {imgUrl: one},
                        {imgUrl: five},
                        {imgUrl: watch},
                        {imgUrl: four},
                    ],
                },
                {
                    color: '#FFC0CB',
                    images: [
                        {imgUrl: watch},
                        {imgUrl: two},
                        {imgUrl: three},
                        {imgUrl: one},
                        {imgUrl: five},
                        {imgUrl: four},
                    ],
                }
            ],
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