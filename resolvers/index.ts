module.exports = {
  Query: {
    async user(_, { input }, { db }) {
      const user = await db.User.findAll({ where: {email: input.email, password: input.password}})
      return user

    },
    async users(_, { input }, { db }) {
      const users = await db.User.findAll({ where: { location: input.location, interest: input.interest}});
      return users 
      // users = get users array from db using location and interests in input
      // return users;
    },
    async languages(_, __, { db }) {
      const langauges = await db.Language.findAll();
      return langauges
      // get array of languages from db
      // return languages;
    },
    async interests(_, __, { db }) {
      const interests = await db.Interests.findAll();
      return interests
      // get array of interests from db
      // return interests;
    },
    async favorites(_, { input }, { db }) {
      // finds the friends based on the user1Id which will return the friends based on the foriegn key association
      const favorites = await db.Favorites.findAll({where: {user1Id: input.id}})
      return favorites
      // get list of favourites based on user id from input
      // return favorites;
    },
    async experiences(_, { input }, { db }) {
      // get list of experiences based on user id from input
      const experience = await db.user_experiences.findAll({where: {userId: input.id}})
      return experience
      // return experiences;
    },
    async userAlbums(_, { input }, { db }) {
      const photos = await db.UserAlbum.findAll({where: {userId: input.id}})
      return photos
      // get list of photos based on user id from input
      // return photos;
    },
    async messages(_, { input }, { db }) {
      const messages = await db.Messages.findALl({where: {favoriteId: input.id}})
      return messages
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
    async experiences(_, { input }, { db }) {
      if (!input.id) {
        const experience = await db.Experiences.create({userId: input.userId,
           title: input.title,
           description: input.description})
        return experience   
        //add experience to experiences table
      } else if (!input.title) {
        const experience = await db.Experiences.destroy({id: input.id})
        return []
        //delete experience from experiences table
      } else {
        const experience = await db.Experiences.update({userId: input.userId,
          title: input.title,
          description: input.description}, {where: {id: input.id}})
        return experience
        //edit experience in experiences tables
      }
      // return experiences;
    },
    async userAlbums(_, { input }, { db }) {
      if (input.id) {
        const photo = await db.UserAlbum.destroy({where: {id: input.id}})
        return photo
      }
      const photo = await db.UserAlbum.create({imageURL: input.imageURL, userId: input.userId})
      return photo
    },
    // return photo;

    async messages(_, { input }, { db }) {
      // add message to db using input
      const message = await db.Messages.create({favoriteid:input.favoriteid, 
        userid:input.userid, 
        content:input.content});
      
      return message;
    },
    async favorites(_, { input }, { db }) {
      if (input.id) {
        const favorites = await db.Favorites.destroy({where:{id: input.id}})
        // remove from favorite
      } else {
        // add to favorites
        const favorite = await db.Favorites.create({userId: input.favoriteId, user1Id:input.user1Id})
        return favorite
      }
      // return favorites;
    }
  }
}