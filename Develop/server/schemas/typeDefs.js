const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [ Book ]
  }
  
  type Book {
    _id: ID
    authors: [ String ]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input SavedBook {
    _id: ID
    authors: [ String ]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    saveBook(book: SavedBook) 
    removeBook(bookId: String!)
    isLoggedIn(username: String!, password: String!, email: String!): Auth
  }
`;

module.exports = typeDefs;