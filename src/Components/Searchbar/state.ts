import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: ISearch.State = {
    items: [
        {title: 'First one', link: ''},
        {title: 'Second one', link: ''},
        {title: 'Third two', link: ''},
        {title: 'Third three', link: ''},
    ],
    isFocused: false,
}

export const SearchState = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setIsFocused: (state, action: PayloadAction<boolean>) => {
            state.isFocused = action.payload;
        },
        handleOverlayClick: (state) => {
            state.isFocused = false;
        },
        handleInputFocus: (state) => {
            state.isFocused = true;
        }
    },
})

// Action creators are generated for each case reducer function
export const {handleOverlayClick, setIsFocused, handleInputFocus} = SearchState.actions

export default SearchState.reducer