import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Button, Table } from 'react-bootstrap';
import PostFormModal from './PostFormModal';

const PostList = () => {
  const { posts, users, deletePost, createPost, updatePost } = useContext(AppContext);
  const [postToEdit, setPostToEdit] = useState(null);  // State to store the post to be edited

  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  const handleEdit = (post) => {
    setPostToEdit(post);  // Set the post to be edited
  };

  return (
    <div>
      <PostFormModal
        postToEdit={postToEdit}
        setPostToEdit={setPostToEdit}
        createPost={createPost}
        updatePost={updatePost}
        users={users}  // Pass the users list to the modal
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>{findUserName(post.userId)}</td>
              <td>
                <Button variant="warning" className="mr-2" onClick={() => handleEdit(post)}>Edit</Button>
                <Button variant="danger" onClick={() => deletePost(post.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostList;
