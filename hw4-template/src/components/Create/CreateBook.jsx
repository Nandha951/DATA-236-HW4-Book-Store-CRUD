import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBook.css';

const CreateBook = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title, 
          author,
          isbn 
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newBook = await response.json();
      onAddBook(newBook);
      navigate('/');
    } catch (error) {
      setError('Failed to create book. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-book-container">
      <h2>Add New Book</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author Name:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Add Book</button>
      </form>
    </div>
  );
};

export default CreateBook;