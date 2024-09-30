import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editingPost, setEditingPost] = useState(null);

  // Verileri çekme (GET)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Yeni post oluşturma (POST)
  const createPost = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(data => {
        setPosts([data, ...posts]);
        setNewPost({ title: '', body: '' });
      })
      .catch(error => console.error('Error creating post:', error));
  };

  // Post silme (DELETE)
  const deletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => console.error('Error deleting post:', error));
  };

  // Post güncelleme (PUT)
  const updatePost = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${editingPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingPost),
    })
      .then(response => response.json())
      .then(data => {
        setPosts(posts.map(post => post.id === editingPost.id ? data : post));
        setEditingPost(null);
      })
      .catch(error => console.error('Error updating post:', error));
  };

  return (
    <div className="container">
      <h1 className="my-4">React CRUD App (Fetch API)</h1>

      {/* Yeni Post Oluşturma Formu */}
      <div className="mb-4">
        <h3>Create a New Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="form-control mb-2"
        />
        <textarea
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          className="form-control mb-2"
        />
        <button onClick={createPost} className="btn btn-primary">Create Post</button>
      </div>

      {/* Post Listeleme */}
      <h3>Posts</h3>
      <ul className="list-group">
        {posts.map(post => (
          <li key={post.id} className="list-group-item">
            {editingPost?.id === post.id ? (
              <>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="form-control mb-2"
                />
                <textarea
                  value={editingPost.body}
                  onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                  className="form-control mb-2"
                />
                <button onClick={updatePost} className="btn btn-success">Update Post</button>
                <button onClick={() => setEditingPost(null)} className="btn btn-secondary ml-2">Cancel</button>
              </>
            ) : (
              <>
                <h5>{post.title}</h5>
                <p>{post.body}</p>
                <button onClick={() => deletePost(post.id)} className="btn btn-danger mr-2">Delete</button>
                <button onClick={() => setEditingPost(post)} className="btn btn-warning">Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
