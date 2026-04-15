import React, { useState, useEffect } from 'react';

export default function PostForm({ onSubmit, editingPost }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      id: editingPost?.id || Math.random(),
      title,
      body,
      userId: 1,
    };
    onSubmit(post);
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>{editingPost ? 'Edit Post' : 'New Post'}</h2>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
      </div>
      <div>
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{ width: '100%', height: '80px', marginBottom: '10px', padding: '8px' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
        {editingPost ? 'Update Post' : 'Add Post'}
      </button>
    </form>
  );
}