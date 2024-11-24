import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index.ts";

const initialState: IUser.Auth = {
    user: null,
    isAuthenticated: !!localStorage.getItem("access_token"),
    isUserLoading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            state.isAuthenticated = false;
            state.user = null;
        },
        setUser: (state, action: PayloadAction<IUser.Info>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        // setAuthenticated(state, action: PayloadAction<boolean>) {
        //     state.isAuthenticated = action.payload;
        // },
    },
});

export const {logout, setUser} = authSlice.actions;
export const userSelector = (state: RootState) => state.auth.user;
export const isAuthenticatedSelector = (state: RootState) => state.auth.isAuthenticated;
export default authSlice.reducer;