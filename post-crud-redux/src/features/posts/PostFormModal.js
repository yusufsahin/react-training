import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PostForm from './PostForm';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from './postsSlice';
import { closeModal } from '../modals/modalSlice';

const PostFormModal = ({ postToEdit }) => {
  const dispatch = useDispatch();

  const handleFormSubmit = (formData) => {
    if (postToEdit) {
      dispatch(updatePost({ ...postToEdit, ...formData }));
    } else {
      dispatch(addPost(formData));
    }
    dispatch(closeModal());
  };

  return (
    <Modal show onHide={() => dispatch(closeModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{postToEdit ? 'Edit Post' : 'Create Post'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PostForm onSubmit={handleFormSubmit} initialValues={postToEdit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostFormModal;
