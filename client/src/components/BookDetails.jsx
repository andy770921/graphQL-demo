import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_BOOK_QUERY } from '../queries/queries';

function BookDetails({ booksList }) {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [getBookQuery, { error, data: bookQueryData }] = useLazyQuery(GET_BOOK_QUERY, {
    variables: { id: selectedBookId }
  });
  const handleChange = e => {
    setSelectedBookId(e.target.value);
    getBookQuery();
  };
  useEffect(() => {
    if (bookQueryData) {
      setBookData({
        name: bookQueryData.book.name,
        genre: bookQueryData.book.genre,
        author: bookQueryData.book.author.name,
        authorAge: bookQueryData.book.author.age,
        otherBooks: bookQueryData.book.author.books.filter(
          book => book.id !== bookQueryData.book.id
        )
      });
    }
  }, [bookQueryData]);
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
        {bookData ? (
          <>
            <p>Book Name: {bookData.name}</p>
            <p>Book Genre: {bookData.genre}</p>
            <p>Book Author: {bookData.author}</p>
            <p>Book Author's age: {bookData.authorAge}</p>
            <p>Other Books from the Same Author:</p>
            <ul>
              {bookData.otherBooks.map(book => (
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
