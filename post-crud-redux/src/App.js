import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './features/posts/PostList';
import UsersPage from './features/users/UsersPage';
import ModalManager from './features/modals/ModalManager';
import NaviBar from './features/common/NaviBar';

function App() {
  return (
    <Router>
      <NaviBar />
      <ModalManager />
      <Routes>
        {/* No need for exact, React Router v6 matches routes more precisely */}
        <Route path="/" element={<PostList />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
