import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index.ts";

interface AuthState {
    isAuthenticated: boolean;
    user: IUser.Info | null;
    isInitialized: boolean; // NEW: Track if auth state has been checked
}

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem("access_token"), // Check token on load
    user: null,
    isInitialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
            state.isInitialized = true;
        },
        setUser: (state, action: PayloadAction<IUser.Info>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.isInitialized = true;
        },
        // NEW: Mark auth as initialized
        setInitialized: (state) => {
            state.isInitialized = true;
        }
    },
});

export const {setAuthenticated, setUser, logout, setInitialized} = authSlice.actions;

// Selectors
export const isAuthenticatedSelector = (state: RootState) => state.auth.isAuthenticated;
export const userSelector = (state: RootState) => state.auth.user;
export const isInitializedSelector = (state: RootState) => state.auth.isInitialized;

export default authSlice.reducer;