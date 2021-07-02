const { gql } = require('apollo-server');

const typedefs = gql`

  type User{
    id: ID!
    firstName: String!
    lastName: String!
    dob: Int
    guide: Boolean!
    city: String!
    country: String!
    gender: Gender!
    summary: String
    profileImg: String
    filterCity: String
    languages: [Language]
    interests: [Interest]
    favorites: [Favorite]
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
    userId: Int!
    user1Id: Int!
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
    city: String
    country: String
    gender: Gender
    summary: String
    profileImg: String
    filterCity: String
    languages: [String]
    interests: [String]
    favorites: [String]
  }

  input UsersInput {
    city: String!
    interests: [InterestInput]
  }

  input InterestInput {
    id: ID!
    name: String!
  }

  input ExperienceInput {
    id: ID
    userId: Int!
    title: String
    description: String
  }

  input PhotoInput {
    id:Int
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
    favoriteId: String
    user1Id: String
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  type Query {
    user(input: LoginInput!): User! #login user
    users(input: UsersInput): [User]! #retrive list of cards
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
    messages(input: MessageInput!): Message! #add or edit messages associated with a chat
    favorites(input: FavoriteInput!): Favorite! #add or remove favorite
    bulkCreateInterests: [Interest]
    bulkCreateLanguages: User
    bulkCreateFavorites: User
    languages:[Language]!
  }

`;

module.exports = typedefs
