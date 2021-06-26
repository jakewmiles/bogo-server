module.exports = {
  Query: {
    user(_, { input }, { db }) {
      // user = get user details from db using logininput
      return user;
    },
    users(_, { input }, { db }) {
      // users = get users array from db using location and interests in input
      return users;
    },
    languages(_, __, { db }) {
      // get array of languages from db
      return languages;
    },
    interests(_, __, { db }) {
      // get array of interests from db
      return interests;
    },
    favorites(_, { input }, { db }) {
      // get list of favourites based on user id from input
      return favorites;
    },
    experiences(_, { input }, { db }) {
      // get list of experiences based on user id from input
      return experiences;
    },
    userAlbums(_, { input }, { db }) {
      // get list of photos based on user id from input
      return photos;
    },
    messages(_, { input }, { db }) {
      // get list of photos based on favourite id from input
      return messages;
    }
  },
  Mutation: {
    user(_, { input }, { db }) {
      if (!input.id) {
        // create user
      } else if (!input.email) {
        //delete user from db by ID
      } else {
        // edit user row in db based on input (create or edit function)
      }
      return user;
    },
    experiences(_, { input }, { db }) {
      if (!input.id) {
        //add experience to experiences table
      } else if (!input.title) {
        //delete experience from experiences table
      } else {
        //edit experience in experiences tables
      }
      return experiences;
    },
    userAlbums(_, { input }, { db }) {
      //photo = check if photo already exists in user album from db
      if (photo) {
        //delete photo
      } else {
        // create photo
      }
      return photo;

    },
    messages(_, { input }, { db }) {
      // add message to db using input
      return message;
    },
    favorites(_, { input }, { db }) {
      if (input.id) {
        // remove from favorites
      } else {
        // add to favorites
      }
      return favorites;
    }
  }
}
