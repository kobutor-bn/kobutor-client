import {createSlice} from '@reduxjs/toolkit'
import {IModal} from "../../Services/Modal";

const initialState: IModal.State = {
    isMenuOpen: false,
    isModalOpen: false,
}

export const ModalSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen

            const menuIcon = document.querySelector('.menu-icon');
            // @ts-expect-error because js can't detect if it's a valid html selector
            menuIcon.classList.toggle('clicked');
        },

        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen
        },
    },
})

export const {toggleMenu, toggleModal} = ModalSlice.actions

export default ModalSlice.reducer