import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: ICart.Items = {
    qty: 0,
    price: 0,
    items: [],
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddToBag: (state, action: PayloadAction<ICart.Item>) => {
            const itemExists = state.items.some(item => item.id === action.payload.id);

            if (itemExists) {
                state.items = state.items.map(item =>
                    item.id === action.payload.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
        },

        total: (state) => {
            let qty = 0;
            let price = 0;

            state.items.forEach(item => {
                qty += item.quantity;
                price += item.price;
            })

            state.qty = qty;
            state.price = price;
        }
    },
})

// Action creators are generated for each case reducer function
export const {AddToBag} = CartSlice.actions

export default CartSlice.reducer