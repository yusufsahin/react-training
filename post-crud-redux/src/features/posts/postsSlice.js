import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../app/axiosInstance';

// Fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/posts');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Error fetching posts');
  }
});

// Add a post
export const addPost = createAsyncThunk('posts/addPost', async (newPost, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/posts', newPost);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Error adding post');
  }
});

// Update a post
export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/posts/${updatedPost.id}`, updatedPost);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Error updating post');
  }
});

// Delete a post
export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/posts/${postId}`);
    return postId;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Error deleting post');
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add post
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
        state.error = null;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        state.posts[index] = action.payload;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
