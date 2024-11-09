import {createSlice} from '@reduxjs/toolkit';
import {IModal} from "../../typings/Modal";

const initialState = {
    isModalOpen: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {},
    reducers: {
        toggleModal: (state) => {
        },
        closeModal: (state) => {
        },
    },
});

export const {toggleModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;