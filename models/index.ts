const { Sequelize } = require('sequelize');
const { UserFactory, UserStatic } = require('./user')
const { LanguageFactory, LanguageStatic } = require('./languages')
const { FavoritesFactory, FavoritesStatic } = require('./favorites')
const { ExperiencesFactory, ExperiencesStatic } = require('./experiences')
const { InterestsFactory, InterestsStatic } = require('./interests')
const { UserAlbumFactory, UserAlbumStatic } = require('./user-album')
const { MessagesFactory, MessagesStatic } = require('./messages')



// type DB = {
//   sequelize: typeof Sequelize;
//   User: typeof UserStatic;
//   Language: typeof LanguageStatic;
//   Favorites: typeof FavoritesStatic;
//   Experiences: typeof ExperiencesStatic;
//   Interests: typeof InterestsStatic;
//   UserAlbum: typeof UserAlbumStatic;
//   Messages: typeof MessagesStatic;

// }

const sequelize = new Sequelize(
  (process.env.DB_NAME = "bogo"),
  (process.env.DB_USER = "postgres"),
  (process.env.DB_PASSWORD = ""),
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
const Favorites = FavoritesFactory(sequelize)
const Experiences = ExperiencesFactory(sequelize)
const Interests = InterestsFactory(sequelize)
const UserAlbum = UserAlbumFactory(sequelize)
const Messages = MessagesFactory(sequelize)

User.hasMany(Experiences)
User.hasMany(UserAlbum)
User.hasMany(Favorites)
Favorites.hasMany(Messages)
User.belongsToMany(Language, { through: 'user_language' })
User.belongsToMany(Interests, { through: 'user_interests' })
Experiences.belongsToMany(Interests, { through: 'experiences_interests' })


let DB = {
  sequelize,
  User,
  Language,
  Favorites,
  Experiences,
  Interests,
  UserAlbum,
  Messages,
};

module.exports = DB;