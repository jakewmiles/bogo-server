module.exports = {
    Query: {
        async user: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
        },
        users: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            // users = get users array from db using location and interests in input
            // return users;
        },
        languages: function (_, __, _a) {
            var db = _a.db;
            // get array of languages from db
            // return languages;
        },
        interests: function (_, __, _a) {
            var db = _a.db;
            // get array of interests from db
            // return interests;
        },
        favorites: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            // get list of favourites based on user id from input
            // return favorites;
        },
        experiences: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            // get list of experiences based on user id from input
            // return experiences;
        },
        userAlbums: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            // get list of photos based on user id from input
            // return photos;
        },
        messages: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            // get list of photos based on favourite id from input
            // return messages;
        }
    },
    Mutation: {
        async user: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            if (!input.id) {
            
            }
            else if (!input.email) {
                //delete user from db by ID
            }
            else {
                // edit user row in db based on input (create or edit function)
            }
            // return user;
        },
        experiences: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            if (!input.id) {
                //add experience to experiences table
            }
            else if (!input.title) {
                //delete experience from experiences table
            }
            else {
                //edit experience in experiences tables
            }
            // return experiences;
        },
        userAlbums: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            //photo = check if photo already exists in user album from db
            // if (photo) {
            //delete photo
            // } else {
            // create photo
        },
        // return photo;
        messages: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            // add message to db using input
            // return message;
        },
        favorites: function (_, _a, _b) {
            var input = _a.input;
            var db = _b.db;
            if (input.id) {
                // remove from favorites
            }
            else {
                // add to favorites
            }
            // return favorites;
        }
    }
};
