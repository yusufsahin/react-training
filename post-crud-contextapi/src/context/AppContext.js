import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/posts');
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const createPost = async (post) => {
    try {
      const response = await axios.post('http://localhost:4000/posts', post);
      setPosts([...posts, response.data]);
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      const response = await axios.put(`http://localhost:4000/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? response.data : post));
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, []);

  return (
    <AppContext.Provider value={{ users, posts, fetchUsers, fetchPosts, createPost, updatePost, deletePost }}>
      {children}
    </AppContext.Provider>
  );
};
