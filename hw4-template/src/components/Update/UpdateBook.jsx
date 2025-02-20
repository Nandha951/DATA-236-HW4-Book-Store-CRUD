import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateBook.css';

const UpdateBook = ({ onUpdateBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/books/${id}`);
      if (response.ok) {
        const book = await response.json();
        setTitle(book.title);
        setAuthor(book.author);
      } else {
        throw new Error('Book not found');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
      });

      if (response.ok) {
        const updatedBook = await response.json();
        onUpdateBook && onUpdateBook(updatedBook);
        navigate('/');
      } else {
        throw new Error('Failed to update book');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="update-book-container">
      <h2>Update Book</h2>
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
        <div className="button-group">
          <button type="submit" className="submit-button">Update Book</button>
          <button type="button" onClick={() => navigate('/')} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;