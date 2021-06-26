import { Sequelize } from 'sequelize';
import { UserFactory, UserStatic } from './user'
import { LanguageFactory, LanguageStatic } from './languages'
import { FavoritesFactory, FavoritesStatic } from './favorites';
import { ExperiencesFactory, ExperiencesStatic } from './experiences';
import { InterestsFactory, InterestsStatic } from './interests';
import { UserAlbumFactory, UserAlbumStatic } from './user-album';
import { MessagesFactory,  MessagesStatic } from './messages';



export interface DB {
  sequelize: Sequelize;
  User: UserStatic;
  Language: LanguageStatic;
  Favorites: FavoritesStatic;
  Experiences: ExperiencesStatic;
  Interests: InterestsStatic;
  UserAlbum: UserAlbumStatic;
  Messages: MessagesStatic;

}

export const sequelize = new Sequelize(
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
Favorites.hasMany(Messages)
Experiences.belongsToMany(Interests, {through: 'experiences_interests'})
User.belongsToMany(Language, { through: 'user_language'})
User.belongsToMany(Interests, {through: 'user_interests'})
// User.belongsToMany(User, {through: 'Favourites'})


export const db: DB = {
  sequelize,
  User,
  Language,
  Favorites,
  Experiences,
  Interests,
  UserAlbum,
  Messages,
};