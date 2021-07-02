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
module.exports = {
    Query: {
        user: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var user, languagesArray, languages, interestsArray, interests, favoritesInfoFromDb, favorites;
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
                            return [4 /*yield*/, db.Favorites.findAll({ where: { user1Id: "51" } })];
                        case 4:
                            favoritesInfoFromDb = _c.sent();
                            favorites = [];
                            favoritesInfoFromDb.forEach(function (favorite) {
                                favorites.push({
                                    id: favorite.dataValues.id,
                                    userId: favorite.dataValues.userId,
                                    user1Id: favorite.dataValues.user1Id
                                });
                            });
                            user.dataValues.languages = languages;
                            user.dataValues.interests = interests;
                            user.dataValues.favorites = favorites;
                            return [2 /*return*/, user.dataValues];
                    }
                });
            });
        },
        users: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            var users = db.User.findAll();
            //{ where: { location: input.location, interest: input.interest}}
            return users;
            // users = get users array from db using location and interests in input
            // return users;
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
                            return [2 /*return*/, langauges
                                // get array of languages from db
                                // return languages;
                            ];
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
                            return [2 /*return*/, interests
                                // get array of interests from db
                                // return interests;
                            ];
                    }
                });
            });
        },
        favorites: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var favorites;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, db.Favorites.findAll({ where: { user1Id: input.id } })];
                        case 1:
                            favorites = _c.sent();
                            return [2 /*return*/, favorites
                                // get list of favourites based on user id from input
                                // return favorites;
                            ];
                    }
                });
            });
        },
        experiences: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var experience;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, db.user_experiences.findAll({ where: { userId: input.id } })];
                        case 1:
                            experience = _c.sent();
                            return [2 /*return*/, experience
                                // return experiences;
                            ];
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
                            return [2 /*return*/, photos
                                // get list of photos based on user id from input
                                // return photos;
                            ];
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
                        case 0: return [4 /*yield*/, db.Messages.findAll({ where: { favoriteId: input.id } })];
                        case 1:
                            messages = _c.sent();
                            return [2 /*return*/, messages
                                // get list of photos based on favourite id from input
                                // return messages;
                            ];
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
                var user, i, i, languagesArray, languages_1, interestsArray, interests_1, user, user;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            //convert int from client into gender enum
                            switch (input.gender) {
                                case 0:
                                    input.gender = 'MALE';
                                    break;
                                case 1:
                                    input.gender = 'FEMALE';
                                    break;
                                case 2:
                                    input.gender = 'OTHER';
                                    break;
                            }
                            if (!!input.id) return [3 /*break*/, 12];
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
                        case 9: return [4 /*yield*/, db.User.findOne({
                                where: { email: user.dataValues.email },
                                include: db.Language
                            })];
                        case 10:
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
                        case 11:
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
                            user.dataValues.favorites = [];
                            return [2 /*return*/, user.dataValues];
                        case 12:
                            if (!!input.email) return [3 /*break*/, 14];
                            return [4 /*yield*/, db.User.destroy({ where: { id: input.id } })];
                        case 13:
                            user = _c.sent();
                            user.removeLanguage();
                            user.removeInterests();
                            user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);
                            return [2 /*return*/, user];
                        case 14: return [4 /*yield*/, db.User.update({
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
                        case 15:
                            user = _c.sent();
                            user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);
                            return [2 /*return*/, user];
                    }
                });
            });
        },
        experiences: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var experience, experience, experience;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!!input.id) return [3 /*break*/, 2];
                            return [4 /*yield*/, db.Experiences.create({
                                    userId: input.userId,
                                    title: input.title,
                                    description: input.description
                                })];
                        case 1:
                            experience = _c.sent();
                            return [2 /*return*/, experience
                                //add experience to experiences table
                            ];
                        case 2:
                            if (!!input.title) return [3 /*break*/, 4];
                            return [4 /*yield*/, db.Experiences.destroy({ id: input.id })];
                        case 3:
                            experience = _c.sent();
                            return [2 /*return*/, []
                                //delete experience from experiences table
                            ];
                        case 4: return [4 /*yield*/, db.Experiences.update({
                                userId: input.userId,
                                title: input.title,
                                description: input.description
                            }, { where: { id: input.id } })];
                        case 5:
                            experience = _c.sent();
                            return [2 /*return*/, experience
                                //edit experience in experiences tables
                            ];
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
        // return photo;
        messages: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var message;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, db.Messages.create({
                                favoriteid: input.favoriteid,
                                userid: input.userid,
                                content: input.content
                            })];
                        case 1:
                            message = _c.sent();
                            return [2 /*return*/, message];
                    }
                });
            });
        },
        favorites: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var favorites, favorite;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!input.id) return [3 /*break*/, 2];
                            return [4 /*yield*/, db.Favorites.destroy({ where: { id: input.id } })];
                        case 1:
                            favorites = _c.sent();
                            return [2 /*return*/, favorites
                                // remove from favorite
                            ];
                        case 2: return [4 /*yield*/, db.Favorites.create({ userId: input.favoriteId, user1Id: input.user1Id })];
                        case 3:
                            favorite = _c.sent();
                            return [2 /*return*/, favorite];
                    }
                });
            });
        },
        languages: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            return __awaiter(this, void 0, void 0, function () {
                var languages, language;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!input.id) return [3 /*break*/, 2];
                            return [4 /*yield*/, db.users_languages.destroy({ where: { id: input.id } })
                                // remove from favorite
                            ];
                        case 1:
                            languages = _c.sent();
                            // remove from favorite
                            return [2 /*return*/, languages];
                        case 2: return [4 /*yield*/, db.users_langauges.create({ userId: input.UserId, name: input.name })];
                        case 3:
                            language = _c.sent();
                            return [2 /*return*/, language];
                    }
                });
            });
        },
        bulkCreateInterests: function (_, __, _a) {
            var db = _a.db;
            return __awaiter(this, void 0, void 0, function () {
                var bulkInterests;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, db.Interests.bulkCreate([{ name: "rock-climbing" }, { name: "skiing" }, { name: "singing" }, { name: "cooking" }])];
                        case 1:
                            bulkInterests = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
        bulkCreateLanguages: function (_, __, _a) {
            var db = _a.db;
            var bulkLanguages = db.Language.bulkCreate([{ name: "English" }, { name: "Japanese" }, { name: "Russian" }, { name: "Urdu" }]);
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
