import {createSlice} from '@reduxjs/toolkit'
import {IModal} from "../../Services/Modal";

const initialState: IModal.State = {
    isOpen: false,
}

export const ModalSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen

            const menuIcon = document.querySelector('.menu-icon');
            // @ts-expect-error because js can't detect if it's a valid html selector
            menuIcon.classList.toggle('clicked');
        }
    },
})

export const {toggleMenu} = ModalSlice.actions

export default ModalSlice.reducer