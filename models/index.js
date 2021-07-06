var Sequelize = require('sequelize').Sequelize;
var _a = require('./user'), UserFactory = _a.UserFactory, UserStatic = _a.UserStatic;
var _b = require('./languages'), LanguageFactory = _b.LanguageFactory, LanguageStatic = _b.LanguageStatic;
var _c = require('./chats'), ChatsFactory = _c.ChatsFactory, ChatsStatic = _c.ChatsStatic;
var _d = require('./favorites'), FavoritesFactory = _d.FavoritesFactory, FavoritesStatic = _d.FavoritesStatic;
var _e = require('./interests'), InterestsFactory = _e.InterestsFactory, InterestsStatic = _e.InterestsStatic;
var _f = require('./user-album'), UserAlbumFactory = _f.UserAlbumFactory, UserAlbumStatic = _f.UserAlbumStatic;
var _g = require('./messages'), MessagesFactory = _g.MessagesFactory, MessagesStatic = _g.MessagesStatic;
var _h = require('./reviews'), ReviewFactory = _h.ReviewFactory, ReviewStatic = _h.ReviewStatic;
var sequelize = new Sequelize((process.env.DB_NAME = 'bogo'), (process.env.DB_USER = 'postgres'), (process.env.DB_PASSWORD = 'postgres'), {
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
var Chats = ChatsFactory(sequelize);
var Favorites = FavoritesFactory(sequelize);
var Interests = InterestsFactory(sequelize);
var UserAlbum = UserAlbumFactory(sequelize);
var Messages = MessagesFactory(sequelize);
var Reviews = ReviewFactory(sequelize);
User.hasMany(UserAlbum);
User.hasMany(Chats);
User.hasMany(Reviews);
Chats.hasMany(Messages);
User.hasMany(Favorites);
User.belongsToMany(Language, { through: 'user_language' });
User.belongsToMany(Interests, { through: 'user_interests' });
var DB = {
    sequelize: sequelize,
    User: User,
    Language: Language,
    Chats: Chats,
    Favorites: Favorites,
    Interests: Interests,
    UserAlbum: UserAlbum,
    Messages: Messages,
    Reviews: Reviews
};
module.exports = DB;
