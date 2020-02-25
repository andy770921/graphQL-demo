import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORS_QUERY } from '../queries/queries';

function AddBook() {
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <form id="add-book">
      <div>
        <label>Book Name:</label>
        <input type="text" />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div>
        <label>Author</label>
        <select>
          <option> Select Author </option>
          {data.authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
export default AddBook;
