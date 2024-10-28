import {createSlice} from '@reduxjs/toolkit';
import {IMenu} from '../../typings/Menu';

const initialState: IMenu.State = {
    isOpen: false,
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isOpen = !state.isOpen;

            const menuIcon = document.querySelector('.menu-icon');
            if (menuIcon) {
                menuIcon.classList.toggle('clicked');
            }
        },
        closeMenu: (state) => {
            state.isOpen = false;
            const menuIcon = document.querySelector('.menu-icon');
            if (menuIcon) {
                menuIcon.classList.remove('clicked');
            }
        },
    },
});

export const {toggleMenu, closeMenu} = menuSlice.actions;
export default menuSlice.reducer;