import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_BOOKS_QUERY = gql`
  {
    books {
      name
      id
    }
  }
`;
function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <ul id="book-list">
        {data.books.map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default BookList;
