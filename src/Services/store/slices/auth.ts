// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {unsetUser} from "./user.ts";

const initialState: API.TokenResponse = {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {
        logout: (state) => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            unsetUser();
        },
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;