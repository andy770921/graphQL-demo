import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOOKS_QUERY } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const { loading, error, data: booksQueryData } = useQuery(GET_BOOKS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <ul id="book-list">
        {booksQueryData.books.map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
      <BookDetails booksList={booksQueryData.books} />
    </div>
  );
}
export default BookList;
