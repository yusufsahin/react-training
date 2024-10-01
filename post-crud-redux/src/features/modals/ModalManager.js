import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from './modalSlice';
import PostFormModal from '../posts/PostFormModal';  // Example of modal to be rendered

// Map the modal types to their corresponding components
const MODAL_COMPONENTS = {
  PostFormModal,  // Add other modals here as needed
};

const ModalManager = () => {
  const dispatch = useDispatch();
  const { modalType, modalProps } = useSelector((state) => state.modals);  // Get modal state

  if (!modalType) {
    return null;  // No modal to show
  }

  // Dynamically render the correct modal based on modalType
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} onClose={() => dispatch(closeModal())} />;
};

export default ModalManager;
