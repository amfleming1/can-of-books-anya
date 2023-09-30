import React from 'react';

const Books = ({ books }) => {
  const bookComponents = books.map(book => (
    <div key={book.id}>
      {book.Title}
    </div>
  ));

  return (
    <div>
      {books.length === 0 ? (
        <p>Books are Empty.</p>
      ) : (
        <div>
          <div>Found Books</div>
          {bookComponents}
        </div>
      )}
    </div>
  );
};

export default Books;
