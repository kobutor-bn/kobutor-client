import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface AuthenticateState {
    value: number
}

const initialState: AuthenticateState = {
    value: 0,
}

export const AuthenticateSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = AuthenticateSlice.actions

export default AuthenticateSlice.reducer