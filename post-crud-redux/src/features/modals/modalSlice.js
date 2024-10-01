import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,  // No modal is open initially
  modalProps: {},   // Props to pass into the modal
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload.modalType;  // Set modal type to open
      state.modalProps = action.payload.modalProps || {};  // Set any modal props
    },
    closeModal: (state) => {
      state.modalType = null;  // Close the modal
      state.modalProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
