import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface AuthenticateState {
    email: string;
    password: string;
    isLoggedIn?: boolean;
}

const initialState: AuthenticateState = {
    email: "",
    password: "",
    isLoggedIn: false
}

export const AuthenticateSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ email: string; password: string }>) => {
            const {email, password} = action.payload;
            state.email = email;
            state.password = password;
            state.isLoggedIn = true;
        },
    },
})

// Action creators are generated for each case reducer function
export const {login} = AuthenticateSlice.actions

export default AuthenticateSlice.reducer