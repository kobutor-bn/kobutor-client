import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../index.ts";

type UserState = {
    user: IUser.Info | null; // <-- nullable property
}

const initialState: UserState = {
    user: null
};

export const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser.Info>) => {
            state.user = action.payload;
        },
        unsetUser: () => initialState, // Reset user state on logout
        addFavorite: (state, action: PayloadAction<IProduct.Item>) => {},
        removeFavorite: (state, action: PayloadAction<string>) => {},
    },
});

export const {addFavorite, removeFavorite, setUser, unsetUser} = UserSlice.actions;
export const userSelector = (state: RootState) => state.user.user;
export default UserSlice.reducer;