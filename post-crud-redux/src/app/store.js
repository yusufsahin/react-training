import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import modalReducer from '../features/modals/modalSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    modals: modalReducer,
  },
});
