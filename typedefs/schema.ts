const { gql } = require('apollo-server');

const typedefs = gql`

  type User{
    id: ID!
    firstName: String
    lastName: String
    dob: Int
    guide: Boolean
    city: String
    country: String
    gender: Gender
    summary: String
    profileImg: String
    userAlbum: [Photo]
    filterCity: String
    languages: [Language]
    interests: [Interest]
    chats: [Chat]
    isFavorited: Boolean
  }

  type Language {
    id: ID!
    name: String!
  }

  type Interest {
    id: ID!
    name: String!
  }

  type Chat {
    id: ID!
    userId: Int!
    user1Id: Int!
    profile: User
  }

  type Message {
    id: ID!
    chatId: Int!
    authorId: Int!
    content: String
  }

  type Experience {
    id: ID!
    userId: Int!
    title: String!
    description: String
  }

  type Photo {
    photoId: ID!
    imageUrl: String!
  }

  type Place {
    name: String!
    rating: Float!
    user_ratings_total: Int!
    types: [String]!
    icon: String!

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
    gender: String
    summary: String
    profileImg: String
    userAlbum: [String]
    filterCity: String
    languages: [String]
    interests: [String]
    filterFavorites: Boolean
  }

  input UsersInput {
    activeUserId: String!
    city: String!
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
    photos: [String]!
    userId: Int!
  }

  input MessageInput {
    chatId: String
    senderId:String
    recieverId: String
    content: String
  }

  input FavoriteInput {
    userId: String
    targetUserId: String
  }

  input CoordsInput {
    lat: String!
    lng: String!
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
    chats(input: UserInput!): [Chat]! #get list of chats when clicking faves tab
    experiences(input: UserInput!): [Experience]! #get list of experiences when looking at a user profile
    userAlbums(input: UserInput!): [Photo]! #get photos when looking at a user profile
    messages(input: MessageInput!): [Message]! #get messages when opening a chat
    places(input: CoordsInput!): [Place]!
  }

  type Mutation {
    user(input: UserInput!): User! #edit user profile
    experiences(input: ExperienceInput!): Experience! #add or edit experiences associated with user profile
    userAlbums(input: PhotoInput!): [Photo]! #add or edit photos associated with user profile
    messages(input: MessageInput!): Message! #add or edit messages associated with a chat
    favorites(input: FavoriteInput!): User #add or remove favorite
    bulkCreateInterests: [Interest]
    bulkCreateLanguages: User
    bulkCreateFavorites: User
    languages:[Language]!
  }

`;

module.exports = typedefs
