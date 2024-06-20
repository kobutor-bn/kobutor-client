// Infer the `Store` and `AppDispatch` types from the store itself
import {configureStore} from '@reduxjs/toolkit'
import SearchState from './slices/searchBar.ts'
import DropdownSlice from "./slices/dropdown.ts";
import CartSlice from "../../Pages/Cart/Cart.ts";
import ProductSlice from "./slices/productDetails.ts";
import AuthenticateSlice from "./slices/auth.ts";
import UserSlice from "./slices/user.ts";
import MenuSlice from "./slices/menu.ts";
import ModalSlice from "./slices/modal.ts";
import ReviewSlice from "./slices/review.ts";

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
    },
})

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;