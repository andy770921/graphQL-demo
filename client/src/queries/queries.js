import { gql } from 'apollo-boost';

const GET_AUTHORS_QUERY = gql`
  {
    authors {
      name
      id
    }
  }
`;

const GET_BOOKS_QUERY = gql`
  {
    books {
      name
      id
    }
  }
`;

export { GET_AUTHORS_QUERY, GET_BOOKS_QUERY };
