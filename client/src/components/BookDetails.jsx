import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_BOOK_QUERY } from '../queries/queries';

function BookDetails({ booksList }) {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [getBookQuery, { error, data: bookQueryData }] = useLazyQuery(GET_BOOK_QUERY, {
    variables: { id: selectedBookId }
  });
  const handleChange = e => {
    setSelectedBookId(e.target.value);
    getBookQuery();
  };
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <h2> Select Book for Details: </h2>
      <select onChange={handleChange}>
        <option> Select Book </option>
        {booksList.map(book => (
          <option key={book.id} value={book.id}>
            {book.name}
          </option>
        ))}
      </select>
      <div id="book-details">
        {bookQueryData ? (
          <>
            <p>Book Name: {bookQueryData.book.name}</p>
            <p>Book Genre: {bookQueryData.book.genre}</p>
            <p>Book Author: {bookQueryData.book.author.name}</p>
            <p>Book Author's age: {bookQueryData.book.author.age}</p>
            <p>Other Books from the Same Author:</p>
            <ul>
              {bookQueryData.book.author.books
                .filter(book => book.id !== bookQueryData.book.id)
                .map(book => (
                  <li key={book.id}>{book.name}</li>
                ))}
            </ul>
          </>
        ) : null}
      </div>
      <h2> ------- </h2>
    </div>
  );
}

export default BookDetails;
