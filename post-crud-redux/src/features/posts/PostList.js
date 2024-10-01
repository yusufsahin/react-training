import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from './postsSlice';
import { fetchUsers } from '../users/usersSlice';
import { openModal } from '../modals/modalSlice';
import PostCard from './PostCard';
import ConfirmDeleteModal from '../common/ConfirmDeleteModal';
import { Button } from 'react-bootstrap';

const PostList = () => {
  const dispatch = useDispatch();
  
  // Getting posts, users, loading, and error states from Redux store
  const { posts, loading: postsLoading, error: postsError } = useSelector((state) => state.posts);
  const { users, loading: usersLoading, error: usersError } = useSelector((state) => state.users);

  // Local states for managing the selected post for deletion and modal visibility
  const [postToDelete, setPostToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetching posts and users when the component mounts
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handle the edit action: open the PostFormModal for editing the post
  const handleEdit = (post) => {
    dispatch(openModal({
      modalType: 'PostFormModal',
      modalProps: { postToEdit: post },
    }));
  };

  // Handle the delete action: open ConfirmDeleteModal for confirming the deletion
  const handleDelete = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  // Confirm the deletion of the selected post
  const confirmDelete = () => {
    if (postToDelete) {
      dispatch(deletePost(postToDelete.id));
    }
    setShowDeleteModal(false); // Close the modal after confirming deletion
  };

  // Error handling for posts and users
  if (postsError || usersError) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  return (
    <div>
      {/* Button to open the PostFormModal for creating a new post */}
      <Button variant="primary" onClick={() => dispatch(openModal({ modalType: 'PostFormModal' }))}>
        Create Post
      </Button>

      {/* Show loading message if fetching posts or users */}
      {(postsLoading || usersLoading) ? (
        <p>Loading...</p>
      ) : (
        <div className="card-grid">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              body={post.body}
              user={users.find((user) => user.id === post.userId)?.name || 'Unknown User'}
              date={post.postDate}
              onEdit={() => handleEdit(post)}
              onDelete={() => handleDelete(post)}
            />
          ))}
        </div>
      )}

      {/* ConfirmDeleteModal to confirm deletion of a post */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={confirmDelete}
        postTitle={postToDelete ? postToDelete.title : ''}
      />
    </div>
  );
};

export default PostList;
