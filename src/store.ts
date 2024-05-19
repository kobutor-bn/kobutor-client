// Infer the `Store` and `AppDispatch` types from the store itself
import {configureStore} from '@reduxjs/toolkit'
import SearchState from './Components/Searchbar/state.ts'
import DropdownSlice from "./Components/Dropdown/state.ts";
import ModalSlice from "./Components/Modal/state.ts";
import CartSlice from "./Pages/Cart/state.ts";

export const store = configureStore({
    reducer: {
        search: SearchState,
        dropdown: DropdownSlice,
        menu: ModalSlice,
        cart: CartSlice,
    },
})

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;