var Sequelize = require('sequelize').Sequelize;
var _a = require('./user'), UserFactory = _a.UserFactory, UserStatic = _a.UserStatic;
var _b = require('./languages'), LanguageFactory = _b.LanguageFactory, LanguageStatic = _b.LanguageStatic;
var _c = require('./favorites'), FavoritesFactory = _c.FavoritesFactory, FavoritesStatic = _c.FavoritesStatic;
var _d = require('./experiences'), ExperiencesFactory = _d.ExperiencesFactory, ExperiencesStatic = _d.ExperiencesStatic;
var _e = require('./interests'), InterestsFactory = _e.InterestsFactory, InterestsStatic = _e.InterestsStatic;
var _f = require('./user-album'), UserAlbumFactory = _f.UserAlbumFactory, UserAlbumStatic = _f.UserAlbumStatic;
var _g = require('./messages'), MessagesFactory = _g.MessagesFactory, MessagesStatic = _g.MessagesStatic;
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
var sequelize = new Sequelize((process.env.DB_NAME = "bogo"), (process.env.DB_USER = "postgres"), (process.env.DB_PASSWORD = "postgres"), {
    port: Number(process.env.DB_PORT) || 5432,
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    }
});
var User = UserFactory(sequelize);
var Language = LanguageFactory(sequelize);
var Favorites = FavoritesFactory(sequelize);
var Experiences = ExperiencesFactory(sequelize);
var Interests = InterestsFactory(sequelize);
var UserAlbum = UserAlbumFactory(sequelize);
var Messages = MessagesFactory(sequelize);
User.hasMany(Experiences);
User.hasMany(UserAlbum);
User.hasMany(Favorites);
Favorites.hasMany(Messages);
User.belongsToMany(Language, { through: 'user_language' });
User.belongsToMany(Interests, { through: 'user_interests' });
Experiences.belongsToMany(Interests, { through: 'experiences_interests' });
var DB = {
    sequelize: sequelize,
    User: User,
    Language: Language,
    Favorites: Favorites,
    Experiences: Experiences,
    Interests: Interests,
    UserAlbum: UserAlbum,
    Messages: Messages
};
module.exports = DB;
