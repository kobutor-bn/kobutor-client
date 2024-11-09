import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: ICart.Item = {
    id: "",
    quantity: 0,
    price: 0,
    items: [],
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        SetCart: (state, action) => {
            state.items = action.payload;
        },
        AddToBag: (state, action: PayloadAction<{ item: IProduct.Item, selectedColor: string }>) => {
            const {item, selectedColor} = action.payload;
            const itemExists = state.items.some((i: { id: string; selectedColor: string; }) => i.id === item.id && i.selectedColor === selectedColor);

            if (itemExists) {
                state.items = state.items.map(i =>
                    i.id === item.id && i.selectedColor === selectedColor
                        ? {...i, quantity: i.quantity + 1}
                        : i
                );
            } else {
                state.items.push({...item, selectedColor, quantity: 1});
            }

            CartSlice.caseReducers.total(state);
        },

        total: (state) => {
            let qty = 0;
            let price = 0;

            state.items.forEach((item: { quantity: number; price: number; }) => {
                qty += item.quantity;
                price += item.price;
            })

            state.qty = qty;
            state.price = price;
        },

        Remove: (state, action: PayloadAction<{ id: string, selectedColor: string }>) => {
            state.items = state.items.filter(
                (prod: { id: string; selectedColor: string; }) => !(prod.id === action.payload.id && prod.selectedColor === action.payload.selectedColor)
            );

            CartSlice.caseReducers.total(state);
        },
    },
})

// Action creators are generated for each case reducer function
export const {AddToBag, Remove, SetCart} = CartSlice.actions

export default CartSlice.reducer