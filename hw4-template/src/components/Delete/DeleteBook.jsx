import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DeleteBook.css';

const DeleteBook = ({ onDelete }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBook(data);
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete && onDelete(id);
        navigate('/');
      } else {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="delete-book-container">
      <h2>Delete Book</h2>
      {book && (
        <div className="book-details">
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p className="warning-text">Are you sure you want to delete this book?</p>
        </div>
      )}
      <div className="button-group">
        <button onClick={handleDelete} className="delete-button">Delete Book</button>
        <button onClick={() => navigate('/')} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default DeleteBook;