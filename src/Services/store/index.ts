// Infer the `Store` and `AppDispatch` types from the store itself
import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit'
import SearchState from './slices/searchBar.ts'
import DropdownSlice from "./slices/dropdown.ts";
import CartSlice from "./slices/Cart.ts";
import ProductSlice from "./slices/product.ts";
import AuthenticateSlice from "./slices/auth.ts";
import UserSlice from "./slices/user.ts";
import MenuSlice from "./slices/menu.ts";
import ModalSlice from "./slices/modal.ts";
import ReviewSlice from "./slices/review.ts";
import {apiSlice} from "./apiSlice.ts";

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: {
        search: SearchState,
        dropdown: DropdownSlice,
        menu: MenuSlice,
        modal: ModalSlice,
        cart: CartSlice,
        products: ProductSlice,
        auth: AuthenticateSlice,
        user: UserSlice,
        review: ReviewSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware)
            .concat(apiSlice.middleware),
    // devTools: process.env.NODE_ENV !== 'production',
});

// Export RootState and AppDispatch based on the store configuration
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;