var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Op = require("sequelize").Op;
module.exports = {
    Query: {
        user: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var user, languagesArray, languages, interestsArray, interests, imagesArray, images, i, idStr, chatsList, chats;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, db.User.findOne({ where: { email: input.email, password: input.password } })
                            //convert dob from birthdate to age in years
                        ];
                        case 1:
                            user = _c.sent();
                            //convert dob from birthdate to age in years
                            user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);
                            return [4 /*yield*/, db.User.findOne({
                                    where: { email: user.dataValues.email },
                                    include: db.Language
                                })];
                        case 2:
                            languagesArray = _c.sent();
                            languages = [];
                            languagesArray.languages.forEach(function (language) {
                                languages.push({
                                    id: language.dataValues.id,
                                    name: language.dataValues.name
                                });
                            });
                            return [4 /*yield*/, db.User.findOne({
                                    where: { email: user.dataValues.email },
                                    include: db.Interests
                                })];
                        case 3:
                            interestsArray = _c.sent();
                            interests = [];
                            interestsArray.interests.forEach(function (interest) {
                                interests.push({
                                    id: interest.dataValues.id,
                                    name: interest.dataValues.name
                                });
                            });
                            return [4 /*yield*/, db.User.findOne({
                                    where: { email: user.dataValues.email },
                                    include: db.UserAlbum
                                })];
                        case 4:
                            imagesArray = _c.sent();
                            images = [];
                            for (i = 0; i < imagesArray.dataValues.userAlbums.length; i++) {
                                images.push({
                                    photoId: imagesArray.dataValues.userAlbums[i].dataValues.id,
                                    imageUrl: imagesArray.dataValues.userAlbums[i].dataValues.imageURL
                                });
                            }
                            idStr = user.dataValues.id.toString();
                            return [4 /*yield*/, db.Chats.findAll({ where: { user1Id: idStr } })];
                        case 5:
                            chatsList = _c.sent();
                            chats = [];
                            chatsList.forEach(function (chat) { return __awaiter(_this, void 0, void 0, function () {
                                var friend;
                                return __generator(this, function (_a) {
                                    friend = db.User.findOne({ where: { id: chat.dataValues.userId } });
                                    chats.push({
                                        id: chat.dataValues.id,
                                        userId: chat.dataValues.userId,
                                        user1Id: chat.dataValues.user1Id,
                                        profile: friend
                                    });
                                    return [2 /*return*/];
                                });
                            }); });
                            user.dataValues.languages = languages;
                            user.dataValues.interests = interests;
                            user.dataValues.chats = chats;
                            user.dataValues.userAlbum = images;
                            return [2 /*return*/, user.dataValues];
                    }
                });
            });
        },
        users: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var users, returnedUsers, _loop_1, i;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, db.User.findAll({ where: { city: input.city } })];
                        case 1:
                            users = _c.sent();
                            returnedUsers = [];
                            _loop_1 = function (i) {
                                var favorite, languagesArray, languages, interestsArray, interests, imagesArray, images, i_1;
                                var _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            users[i].dataValues.dob = calculateAgeFromBirthdate(users[i].dataValues.dob);
                                            return [4 /*yield*/, db.Favorites.findOne({
                                                    where: (_d = {}, _d[Op.and] = [{ userId: users[i].dataValues.id }, { activeUserId: input.activeUserId }], _d)
                                                })];
                                        case 1:
                                            favorite = _e.sent();
                                            if (favorite) {
                                                users[i].dataValues.isFavorited = true;
                                            }
                                            else {
                                                users[i].dataValues.isFavorited = false;
                                            }
                                            return [4 /*yield*/, db.User.findOne({
                                                    where: { email: users[i].dataValues.email },
                                                    include: db.Language
                                                })];
                                        case 2:
                                            languagesArray = _e.sent();
                                            languages = [];
                                            languagesArray.languages.forEach(function (language) {
                                                languages.push({
                                                    id: language.dataValues.id,
                                                    name: language.dataValues.name
                                                });
                                            });
                                            return [4 /*yield*/, db.User.findOne({
                                                    where: { email: users[i].dataValues.email },
                                                    include: db.Interests
                                                })];
                                        case 3:
                                            interestsArray = _e.sent();
                                            interests = [];
                                            interestsArray.interests.forEach(function (interest) {
                                                interests.push({
                                                    id: interest.dataValues.id,
                                                    name: interest.dataValues.name
                                                });
                                            });
                                            return [4 /*yield*/, db.User.findOne({
                                                    where: { email: users[i].dataValues.email },
                                                    include: db.UserAlbum
                                                })];
                                        case 4:
                                            imagesArray = _e.sent();
                                            images = [];
                                            for (i_1 = 0; i_1 < imagesArray.dataValues.userAlbums.length; i_1++) {
                                                images.push({
                                                    photoId: imagesArray.dataValues.userAlbums[i_1].dataValues.id,
                                                    imageUrl: imagesArray.dataValues.userAlbums[i_1].dataValues.imageURL
                                                });
                                            }
                                            users[i].dataValues.languages = languages;
                                            users[i].dataValues.interests = interests;
                                            users[i].dataValues.userAlbum = images;
                                            returnedUsers.push(users[i].dataValues);
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            i = 0;
                            _c.label = 2;
                        case 2:
                            if (!(i < users.length)) return [3 /*break*/, 5];
                            return [5 /*yield**/, _loop_1(i)];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, returnedUsers];
                    }
                });
            });
        },
        languages: function (_, __, _a) {
            var db = _a.db;
            return __awaiter(this, void 0, void 0, function () {
                var langauges;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, db.Language.findAll()];
                        case 1:
                            langauges = _b.sent();
                            return [2 /*return*/, langauges];
                    }
                });
            });
        },
        interests: function (_, __, _a) {
            var db = _a.db;
            return __awaiter(this, void 0, void 0, function () {
                var interests;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, db.Interests.findAll()];
                        case 1:
                            interests = _b.sent();
                            return [2 /*return*/, interests];
                    }
                });
            });
        },
        chats: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var chats;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, db.Chats.findAll({ where: { user1Id: input.id } })];
                        case 1:
                            chats = _c.sent();
                            return [2 /*return*/, chats];
                    }
                });
            });
        },
        userAlbums: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var photos;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, db.UserAlbum.findAll({ where: { userId: input.id } })];
                        case 1:
                            photos = _c.sent();
                            return [2 /*return*/, photos];
                    }
                });
            });
        },
        messages: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var messages;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, db.Messages.findAll({ where: { chatId: input.chatId } })];
                        case 1:
                            messages = _c.sent();
                            return [2 /*return*/, messages];
                    }
                });
            });
        }
    },
    Mutation: {
        user: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var user, i, i, i, image, imagesArray, images_1, languagesArray, languages_1, interestsArray, interests_1, user;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!!input.id) return [3 /*break*/, 17];
                            return [4 /*yield*/, db.User.create({
                                    firstName: input.firstName,
                                    lastName: input.lastName,
                                    email: input.email,
                                    dob: input.dob,
                                    password: input.password,
                                    guide: input.guide,
                                    city: input.city,
                                    country: input.country,
                                    gender: input.gender,
                                    summary: input.summary,
                                    profileImg: input.profileImg,
                                    filterCity: input.filterCity
                                })
                                //convert dob from birthdate to age in years
                            ];
                        case 1:
                            user = _c.sent();
                            //convert dob from birthdate to age in years
                            user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);
                            i = 0;
                            _c.label = 2;
                        case 2:
                            if (!(i < input.languages.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, user.addLanguage(input.languages[i], user.dataValues.id)];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5:
                            i = 0;
                            _c.label = 6;
                        case 6:
                            if (!(i < input.interests.length)) return [3 /*break*/, 9];
                            return [4 /*yield*/, user.addInterests(input.interests[i], user.dataValues.id)];
                        case 7:
                            _c.sent();
                            _c.label = 8;
                        case 8:
                            i++;
                            return [3 /*break*/, 6];
                        case 9:
                            i = 0;
                            _c.label = 10;
                        case 10:
                            if (!(i < input.userAlbum.length)) return [3 /*break*/, 13];
                            image = input.userAlbum[i];
                            return [4 /*yield*/, db.UserAlbum.create({
                                    userId: user.dataValues.id,
                                    imageURL: image
                                })];
                        case 11:
                            _c.sent();
                            _c.label = 12;
                        case 12:
                            i++;
                            return [3 /*break*/, 10];
                        case 13: return [4 /*yield*/, db.UserAlbum.findAll({
                                where: { userId: user.dataValues.id }
                            })];
                        case 14:
                            imagesArray = _c.sent();
                            images_1 = [];
                            imagesArray.forEach(function (image) {
                                images_1.push({
                                    photoId: image.dataValues.id,
                                    imageUrl: image.dataValues.imageURL
                                });
                            });
                            return [4 /*yield*/, db.User.findOne({
                                    where: { email: user.dataValues.email },
                                    include: db.Language
                                })];
                        case 15:
                            languagesArray = _c.sent();
                            languages_1 = [];
                            languagesArray.languages.forEach(function (language) {
                                languages_1.push({
                                    id: language.dataValues.id,
                                    name: language.dataValues.name
                                });
                            });
                            return [4 /*yield*/, db.User.findOne({
                                    where: { email: user.dataValues.email },
                                    include: db.Interests
                                })];
                        case 16:
                            interestsArray = _c.sent();
                            interests_1 = [];
                            interestsArray.interests.forEach(function (interest) {
                                interests_1.push({
                                    id: interest.dataValues.id,
                                    name: interest.dataValues.name
                                });
                            });
                            user.dataValues.languages = languages_1;
                            user.dataValues.interests = interests_1;
                            user.dataValues.userAlbum = images_1;
                            user.dataValues.chats = [];
                            return [2 /*return*/, user.dataValues];
                        case 17: return [4 /*yield*/, db.User.update({
                                firstName: input.firstName,
                                lastName: input.lastName,
                                email: input.email,
                                dob: input.dob,
                                password: input.password,
                                guide: input.guide,
                                city: input.city,
                                country: input.country,
                                gender: input.gender,
                                summary: input.summary,
                                profileImg: input.profileImg,
                                filterCity: input.filterCity
                            }, { where: { id: input.id } })];
                        case 18:
                            user = _c.sent();
                            if (input.dob) {
                                user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);
                            }
                            return [2 /*return*/, { id: input.id }];
                    }
                });
            });
        },
        userAlbums: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var photo_1, photo;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!input.id) return [3 /*break*/, 2];
                            return [4 /*yield*/, db.UserAlbum.destroy({ where: { id: input.id } })];
                        case 1:
                            photo_1 = _c.sent();
                            return [2 /*return*/, photo_1];
                        case 2: return [4 /*yield*/, db.UserAlbum.create({ imageURL: input.imageURL, userId: input.userId })];
                        case 3:
                            photo = _c.sent();
                            return [2 /*return*/, photo];
                    }
                });
            });
        },
        messages: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var message, chat, chatID;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!input.chatId) return [3 /*break*/, 2];
                            return [4 /*yield*/, db.Messages.create({
                                    chatId: input.chatId,
                                    authorId: input.senderId,
                                    content: input.content
                                })];
                        case 1:
                            message = _c.sent();
                            return [3 /*break*/, 5];
                        case 2: return [4 /*yield*/, db.Chats.create({
                                userId: input.recieverId,
                                user1Id: input.senderId
                            })];
                        case 3:
                            chat = _c.sent();
                            chatID = chat.dataValues.id.toString();
                            return [4 /*yield*/, db.Messages.create({
                                    chatId: chatID,
                                    authorId: input.senderId,
                                    content: input.content
                                })];
                        case 4:
                            message = _c.sent();
                            _c.label = 5;
                        case 5: return [2 /*return*/, message];
                    }
                });
            });
        },
        favorites: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var favorite;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, db.Favorites.findOne({
                                where: (_c = {}, _c[Op.and] = [{ userId: input.targetUserId }, { activeUserId: input.userId }], _c)
                            })
                            //toggle favorites on or off - delete if it is found or create
                        ];
                        case 1:
                            favorite = _d.sent();
                            if (!favorite) return [3 /*break*/, 3];
                            return [4 /*yield*/, db.Favorites.destroy({
                                    where: {
                                        id: favorite.dataValues.id
                                    }
                                })];
                        case 2:
                            _d.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, db.Favorites.create({
                                activeUserId: input.userId,
                                userId: input.targetUserId
                            })];
                        case 4:
                            _d.sent();
                            _d.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        bulkCreateInterests: function (_, __, _a) {
            var db = _a.db;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, db.Interests.bulkCreate([{ name: "Rock-climbing" }, { name: "Skiing" }, { name: "Singing" }, { name: "Cooking" }])];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        bulkCreateLanguages: function (_, __, _a) {
            var db = _a.db;
            db.Language.bulkCreate([{ name: "English" }, { name: "Japanese" }, { name: "Russian" }, { name: "Urdu" }]);
            return;
        }
    }
};
function calculateAgeFromBirthdate(birthdate) {
    var currentTime = new Date();
    var currentDay = currentTime.getDate();
    var currentMonth = currentTime.getMonth() + 1;
    var currentYear = currentTime.getFullYear();
    var birthDay = Number(birthdate.slice(8, 10));
    var birthMonth = Number(birthdate.slice(5, 7));
    var birthYear = Number(birthdate.slice(0, 4));
    var postBirthdayInCurrentYear = 1;
    if (birthMonth > currentMonth || birthMonth === currentMonth && birthDay > currentDay)
        postBirthdayInCurrentYear = 0;
    return currentYear - birthYear + postBirthdayInCurrentYear - 1;
}
;
