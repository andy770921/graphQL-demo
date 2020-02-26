import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_AUTHORS_QUERY, ADD_BOOK_MUTATION, GET_BOOKS_QUERY } from '../queries/queries';

function AddBook() {
  const { loading, error, data: authorQueryData } = useQuery(GET_AUTHORS_QUERY);
  const [addBookMutation] = useMutation(ADD_BOOK_MUTATION);
  // 如果要取得送出 mutation 後的回覆，可以用以下操作
  // const [addBookMutation] = useMutation(ADD_BOOK_MUTATION, {
  //   onCompleted: feedbackFromAddBook => {
  //     console.log('feedbackFromAddBook', feedbackFromAddBook);
  //   }
  // });
  const [bookData, setBookData] = useState({
    name: '',
    genre: '',
    authorId: ''
  });
  const handleChange = e => {
    switch (e.target.attributes.category.value) {
      case 'bookName':
        setBookData({ ...bookData, name: e.target.value });
        break;
      case 'genre':
        setBookData({ ...bookData, genre: e.target.value });
        break;
      case 'author':
        setBookData({ ...bookData, authorId: e.target.value });
        break;
      default:
        break;
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    addBookMutation({
      variables: {
        name: bookData.name,
        genre: bookData.genre,
        authorId: bookData.authorId
      },
      refetchQueries: [{ query: GET_BOOKS_QUERY }]
    });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div>
        <label>Book Name:</label>
        <input type="text" category="bookName" onChange={handleChange} />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" category="genre" onChange={handleChange} />
      </div>
      <div>
        <label>Author</label>
        <select onChange={handleChange} category="author">
          <option> Select Author </option>
          {authorQueryData.authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}
export default AddBook;
