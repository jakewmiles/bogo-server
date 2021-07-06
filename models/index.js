var Sequelize = require('sequelize').Sequelize;
var _a = require('./user'), UserFactory = _a.UserFactory, UserStatic = _a.UserStatic;
var _b = require('./languages'), LanguageFactory = _b.LanguageFactory, LanguageStatic = _b.LanguageStatic;
var _c = require('./chats'), ChatsFactory = _c.ChatsFactory, ChatsStatic = _c.ChatsStatic;
var _d = require('./favorites'), FavoritesFactory = _d.FavoritesFactory, FavoritesStatic = _d.FavoritesStatic;
var _e = require('./experiences'), ExperiencesFactory = _e.ExperiencesFactory, ExperiencesStatic = _e.ExperiencesStatic;
var _f = require('./interests'), InterestsFactory = _f.InterestsFactory, InterestsStatic = _f.InterestsStatic;
var _g = require('./user-album'), UserAlbumFactory = _g.UserAlbumFactory, UserAlbumStatic = _g.UserAlbumStatic;
var _h = require('./messages'), MessagesFactory = _h.MessagesFactory, MessagesStatic = _h.MessagesStatic;
var sequelize = new Sequelize((process.env.DB_NAME), (process.env.DB_USER), (process.env.DB_PASSWORD), {
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
var Experiences = ExperiencesFactory(sequelize);
var Interests = InterestsFactory(sequelize);
var UserAlbum = UserAlbumFactory(sequelize);
var Messages = MessagesFactory(sequelize);
User.hasMany(Experiences);
User.hasMany(UserAlbum);
User.hasMany(Chats);
Chats.hasMany(Messages);
User.hasMany(Favorites);
User.belongsToMany(Language, { through: 'user_language' });
User.belongsToMany(Interests, { through: 'user_interests' });
Experiences.belongsToMany(Interests, { through: 'experiences_interests' });
var DB = {
    sequelize: sequelize,
    User: User,
    Language: Language,
    Chats: Chats,
    Favorites: Favorites,
    Experiences: Experiences,
    Interests: Interests,
    UserAlbum: UserAlbum,
    Messages: Messages
};
module.exports = DB;
