module.exports = {
  Query: {
    async user(_, { input }, { db }) {

    },
    async users(_, { input }, { db }) {
      const users = await db.User.findAll();
      return users 
      // users = get users array from db using location and interests in input
      // return users;
    },
    languages(_, __, { db }) {
      // get array of languages from db
      // return languages;
    },
    interests(_, __, { db }) {
      // get array of interests from db
      // return interests;
    },
    favorites(_, { input }, { db }) {
      // get list of favourites based on user id from input
      // return favorites;
    },
    experiences(_, { input }, { db }) {
      // get list of experiences based on user id from input
      // return experiences;
    },
    userAlbums(_, { input }, { db }) {
      // get list of photos based on user id from input
      // return photos;
    },
    messages(_, { input }, { db }) {
      // get list of photos based on favourite id from input
      // return messages;
    }
  },
  Mutation: {
     async user(_, { input }, { db }) {
      if (!input.id) {
        const user = await  db.User.create({firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        dob: input.dob,
        password: input.password,
        guide: input.guide,
        location: input.location,
        gender: input.gender,
        summary: input.summary,
        profileImg: input.profileImg,
        headerImg: input.headerImg,})
        return user
        
      } else if (!input.email) {
        const user = await db.User.destroy({where:{id: input.id}})
        return user
      } else {
        const user = await db.User.update({firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          dob: input.dob,
          password: input.password,
          guide: input.guide,
          location: input.location,
          gender: input.gender,
          summary: input.summary,
          profileImg: input.profileImg,
          headerImg: input.headerImg,}, {where: {id: input.id}})
        return user
      }
      // return user;
    },
    experiences(_, { input }, { db }) {
      if (!input.id) {
        //add experience to experiences table
      } else if (!input.title) {
        //delete experience from experiences table
      } else {
        //edit experience in experiences tables
      }
      // return experiences;
    },
    userAlbums(_, { input }, { db }) {
      //photo = check if photo already exists in user album from db
      // if (photo) {
      //delete photo
      // } else {
      // create photo
    },
    // return photo;

    messages(_, { input }, { db }) {
      // add message to db using input
      // return message;
    },
    favorites(_, { input }, { db }) {
      if (input.id) {
        // remove from favorites
      } else {
        // add to favorites
      }
      // return favorites;
    }
  }
}