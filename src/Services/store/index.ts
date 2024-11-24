// Infer the `Store` and `AppDispatch` types from the store itself
import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit'
import SearchState from './slices/searchBar.ts'
import CartSlice from "./slices/cart.ts";
import AuthenticateSlice from "./slices/auth.ts";
import OrderSlice from "./slices/order.ts";
import {apiSlice} from "./apiSlice.ts";

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: {
        search: SearchState,
        cart: CartSlice,
        auth: AuthenticateSlice,
        order: OrderSlice,
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
export type AppDispatch = ReturnType<typeof store.dispatch>;