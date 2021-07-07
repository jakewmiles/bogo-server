const { Sequelize } = require('sequelize');
const { UserFactory, UserStatic } = require('./user')
const { LanguageFactory, LanguageStatic } = require('./languages')
const { ChatsFactory, ChatsStatic } = require('./chats')
const { FavoritesFactory, FavoritesStatic } = require('./favorites')
const { InterestsFactory, InterestsStatic } = require('./interests')
const { UserAlbumFactory, UserAlbumStatic } = require('./user-album')
const { MessagesFactory, MessagesStatic } = require('./messages')
const { ReviewFactory, ReviewStatic } = require('./reviews')

const sequelize = new Sequelize(
  (process.env.DB_NAME = 'bogo'),
  (process.env.DB_USER = 'jakemiles'),
  (process.env.DB_PASSWORD = 'postgres'),
  {
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const User = UserFactory(sequelize)
const Language = LanguageFactory(sequelize)
const Chats = ChatsFactory(sequelize)
const Favorites = FavoritesFactory(sequelize)
const Interests = InterestsFactory(sequelize)
const UserAlbum = UserAlbumFactory(sequelize)
const Messages = MessagesFactory(sequelize)
const Reviews = ReviewFactory(sequelize)

User.hasMany(UserAlbum)
User.hasMany(Chats)
User.hasMany(Reviews)
Chats.hasMany(Messages)
User.hasMany(Favorites)
User.belongsToMany(Language, { through: 'user_language' })
User.belongsToMany(Interests, { through: 'user_interests' })


let DB = {
  sequelize,
  User,
  Language,
  Chats,
  Favorites,
  Interests,
  UserAlbum,
  Messages,
  Reviews,
};

module.exports = DB;