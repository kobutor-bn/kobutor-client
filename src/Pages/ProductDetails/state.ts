import {createSlice} from '@reduxjs/toolkit'

const initialState: IProduct.State = {
    title: '',
    desc: '',
    stock: 0,
    price: 0,
}

export const SearchState = createSlice({
    name: 'search',
    initialState,
    reducers: {},
})

// Action creators are generated for each case reducer function
// export const {} = SearchState.actions

export default SearchState.reducer