import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from API
    fetch('http://localhost:3000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="home-container">
      <h1>Book Management System</h1>
      <Link to="/create" className="add-button">Add New Book</Link>
      
      <div className="books-grid">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <div className="book-actions">
              <Link to={`/update/${book.id}`} className="edit-button">Update</Link>
              <Link to={`/delete/${book.id}`} className="delete-button">Delete</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;