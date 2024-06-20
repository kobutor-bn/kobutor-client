import {createSlice} from '@reduxjs/toolkit'
import {IDropDown} from "../../typings/Dropdown";

const initialState: IDropDown.State = {
    options: [
        {label: 'Option 1', value: 'option1'},
        {label: 'Option 2', value: 'option2'},
        {label: 'Option 3', value: 'option3'},
    ],
    isOpen: false,
}

export const DropdownSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        toggleIsOpen: (state) => {
            state.isOpen = !state.isOpen
        },

        selectOption: (state) => {
            state.isOpen = false;
        }
    },
})

export const {toggleIsOpen, selectOption} = DropdownSlice.actions

export default DropdownSlice.reducer