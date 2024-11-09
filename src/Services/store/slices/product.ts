import {createSlice} from '@reduxjs/toolkit'

const initialState: NonNullable<unknown> = {}

export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
})

// Action creators are generated for each case reducer function
// export const {} = SearchState.actions

export default ProductSlice.reducer