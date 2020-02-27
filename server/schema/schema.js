const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data
const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
  { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
  { name: 'Thud', genre: 'Fantasy', id: '5', authorId: '3' },
  { name: 'HogFather', genre: 'Fantasy', id: '6', authorId: '3' }
];

const authors = [
  { name: 'Patrick Rothfuss', age: 44, id: '1' },
  { name: 'Brandon Sanderson', age: 42, id: '2' },
  { name: 'Terry Pratchett', age: 66, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(authorInsideList => authorInsideList.id === parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(bookInsideList => bookInsideList.authorId === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books.find(bookInsideList => bookInsideList.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(authorInsideList => authorInsideList.id === args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const newAuthor = {
          name: args.name,
          age: args.age,
          id: Math.floor(10000 * Math.random())
        };
        authors.push(newAuthor);
        return newAuthor;
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const newBook = {
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
          id: Math.floor(10000 * Math.random())
        };
        books.push(newBook);
        return newBook;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
