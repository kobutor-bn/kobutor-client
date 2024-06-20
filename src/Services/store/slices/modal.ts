import {createSlice} from '@reduxjs/toolkit';
import {IModal} from "../../typings/Modal";

const initialState: IModal.State = {
    isModalOpen: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
});

export const {toggleModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;