import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PostForm from './PostForm';

const PostFormModal = ({ postToEdit, setPostToEdit, createPost, updatePost, users }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPostToEdit(null);  // Clear the postToEdit when modal closes
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    if (postToEdit) {
      handleShow();  // Show the modal if there's a post to edit
    }
  }, [postToEdit]);

  const handleSubmit = (values) => {
    if (postToEdit) {
      updatePost(postToEdit.id, values);  // If editing, update the post
    } else {
      createPost(values);  // Otherwise, create a new post
    }
    handleClose();  // Close the modal after submission
  };

  return (
    <>
      {!postToEdit && (
        <Button variant="primary" onClick={handleShow}>
          Create Post
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{postToEdit ? 'Edit Post' : 'Create New Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostForm
            initialValues={postToEdit || { title: '', body: '', userId: '' }}  // If editing, populate form
            onSubmit={handleSubmit}
            users={users}  // Pass the users list to the form
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostFormModal;
