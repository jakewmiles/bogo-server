const { gql } = require('apollo-server')

const typeDefs = gql`

  type User{
    firstName: String!
    lastName: String!
    dob: String!
    guide: Boolean!
    location: String!
    gender: Gender!
    summary: String
    profileImg: String
    headerImg: String
  }

  type Language {
    id: ID!
    name: String!
  }

  type Interest {
    id: ID!
    name: String!
  }

  type Favorite {
    id: ID!
    user1: Int!
    user2: Int!
  }

  type Message {
    id: ID!
    chatId: Int!
    userId: Int!
    content: String
  }

  type Experience {
    id: ID!
    userId: Int!
    title: String!
    description: String
  }

  type Photo {
    userId: Int!
    imageUrl: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserInput {
    id: ID
    firstName: String
    lastName: String
    email: String
    dob: String
    password: String
    guide: Boolean
    location: String
    gender: Gender
    summary: String
    profileImg: String
    headerImg: String
  }

  input UsersInput {
    location: String!
    interests: [Interest]
  }

  input ExperienceInput {
    id: ID
    userId: Int!
    title: String
    description: String
  }

  input PhotoInput {
    photo: String!
    userId: Int!
  }

  input MessageInput {
    favoriteId: Int!
    userId: Int!
    content: String!
  }

  input FavoriteInput {
    id: Int
    userId: Int!
  }

  enum Gender {
    MALE
    FEMALE
  }

  type Query {
    user(input: LoginInput!): User! #login user
    users(input: UsersInput!): [User]! #retrive list of cards
    languages: [Language]! #language selection when making profile
    interests: [Interest]! #interest selection when making profile
    favorites(input: UserInput!): [Favorite]! #get list of chats when clicking faves tab
    experiences(input: UserInput!): [Experience]! #get list of experiences when looking at a user profile
    userAlbums(input: UserInput!): [Photo]! #get photos when looking at a user profile
    messages(input: MessageInput!): [Message]! #get messages when opening a chat
  }

  type Mutation {
    user(input: UserInput!): User! #edit user profile
    experiences(input: ExperienceInput!): Experience! #add or edit experiences associated with user profile
    userAlbums(input: PhotoInput!): Photo! #add or edit photos associated with user profile
    messages(input: ChatInput!): Message! #add or edit messages associated with a chat
    favorites(input: FavoriteInput!): User! #add or remove favorite
  }

`;

module.exports = typeDefs
