import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const backendUrl = import.meta.env.BACKEND_URL || 'http://localhost:3001';

const BookFormModal = (props) => {
  const [state, setState] = useState({
    Title: '',
    Author: '',
    Description: '',
    URL: '',
  });

  useEffect(() => {
    if (props.book) {
      setState({
        Title: props.book.Title,
        Author: props.book.Author,
        Description: props.book.Description,
        URL: props.book.URL,
      });
    }
  }, [props.book]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      Title: state.Title,
      Author: state.Author,
      Description: state.Description,
      URL: state.URL,
    };

    console.log(newBook);
    props.onBookAdded(newBook, props.id);
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              id="title"
              type="text"
              name="Title"
              value={state.Title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="Author"
              value={state.Author}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="Description"
              value={state.Description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="URL">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              name="URL"
              value={state.URL}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Save Book
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookFormModal;
