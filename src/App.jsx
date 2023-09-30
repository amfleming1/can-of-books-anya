import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Carousel, Image, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Books from "./Books";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import BookFormModal from "./BookFormModal";
import LoginButton from "./AuthButtons";
import Profile from "./Profile";
const BACKEND_URL = import.meta.env.BACKEND_URL || "http://localhost:3001"

const BestBooks = () => {
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const { isAuthenticated } = useAuth0();


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const updateBook = async (bookObj, id) => {
    try {
      const response = await axios.put(`${BACKEND_URL}/Books/${id}`, bookObj);
      setBooks(prevBooks =>
        prevBooks.map(book => (book._id === id ? response.data : book))
      );
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const deleteBook = async id => {
    try {
      await axios.delete(`${BACKEND_URL}/Books/${id}`);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleBookAdded = async newBook => {
    try {
      const response = await axios.post(`${BACKEND_URL}/books`, newBook);
      setBooks(prevBooks => [...prevBooks, response.data]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <Container className="mt-4">
      {books.length === 0 ? (
        <>
        <p>No More Books.</p>
        <Button variant="warning" onClick={() => setShowAddForm(true)}>
            Add Book
          </Button>
        </>
      ) : (
        <div>
          <Carousel>
            {books.map((book, index) => (
              <Carousel.Item key={book._id}>
                <div className="img-wrapper"> 
                <Image
                  fluid
                  className="d-block w-100"
                  src={"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2346&q=80"}
                  alt={`Slide ${index + 1}`}
                  />
                  </div>
                <Carousel.Caption>
                  <h3>{book.Title}</h3>
                  <p>{book.Author}</p>
                  <p>{book.Description}</p>
                  <Button
                    variant="danger"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete Book
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowUpdateForm(true);
                      setSelectedBook(book._id);
                    }}
                  >
                    Update Book
                  </Button>
                  <BookFormModal
                    id={selectedBook}
                    show={showUpdateForm}
                    onHide={() => {
                      setShowUpdateForm(false);
                      setSelectedBook(null);
                    }}
                    onBookAdded={updatedBook =>
                      updateBook(updatedBook, selectedBook)
                    }
                  />
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <Button variant="warning" onClick={() => setShowAddForm(true)}>
            Add Book
          </Button>
          <BookFormModal
            show={showAddForm}
            onHide={() => setShowAddForm(false)}
            onBookAdded={handleBookAdded}
          />
        </div>
      )}
      {!isAuthenticated && <p>Welcome, <LoginButton /></p>}
      <Routes>
        <Route path="/" element={<Books books={books} />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Container>
  );
};

export default BestBooks;
