import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Replace Switch with Routes
import { AppProvider } from './context/AppContext';
import NavigationBar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostsPage from './pages/PostsPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <NavigationBar />
        <div className="container mt-3">
          {/* Use Routes instead of Switch */}
          <Routes>
            {/* Use element prop instead of component */}
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

