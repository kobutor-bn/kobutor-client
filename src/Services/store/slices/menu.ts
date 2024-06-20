import {createSlice} from '@reduxjs/toolkit';
import {IMenu} from '../../typings/Menu';

const initialState: IMenu.State = {
    isMenuOpen: false,
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;

            const menuIcon = document.querySelector('.menu-icon');
            if (menuIcon) {
                menuIcon.classList.toggle('clicked');
            }
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
            const menuIcon = document.querySelector('.menu-icon');
            if (menuIcon) {
                menuIcon.classList.remove('clicked');
            }
        },
    },
});

export const {toggleMenu, closeMenu} = menuSlice.actions;
export default menuSlice.reducer;