const { Op } = require("sequelize");

module.exports = {
  Query: {
    async user(_, { input }, { db }) {
      const user = await db.User.findOne({ where: { email: input.email, password: input.password } })

      //convert dob from birthdate to age in years
      user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);

      const languagesArray = await db.User.findOne({
        where: { email: user.dataValues.email },
        include: db.Language
      })

      let languages = [];

      languagesArray.languages.forEach(language => {
        languages.push({
          id: language.dataValues.id,
          name: language.dataValues.name,
        })
      })

      const interestsArray = await db.User.findOne({
        where: { email: user.dataValues.email },
        include: db.Interests
      })

      let interests = [];

      interestsArray.interests.forEach(interest => {
        interests.push({
          id: interest.dataValues.id,
          name: interest.dataValues.name,
        })
      })

      const idStr = user.dataValues.id.toString()

      const chatsList = await db.Chats.findAll({ where: { user1Id: idStr } });

      let chats = [];


      chatsList.forEach(async chat => {
        const friend = db.User.findOne({ where: { id: chat.dataValues.userId } })
        chats.push({
          id: chat.dataValues.id,
          userId: chat.dataValues.userId,
          user1Id: chat.dataValues.user1Id,
          profile: friend
        });
      })

      user.dataValues.languages = languages;
      user.dataValues.interests = interests;
      user.dataValues.chats = chats;

      return user.dataValues;
    },
    async users(_, { input }, { db }) {
      const users = await db.User.findAll({ where: { city: input.city } })

      const returnedUsers = [];

      //using for loop instead of forEach as forEach does not work asynchronously
      for (let i = 0; i < users.length; i++) {
        users[i].dataValues.dob = calculateAgeFromBirthdate(users[i].dataValues.dob);
        const languagesArray = await db.User.findOne({
          where: { email: users[i].dataValues.email },
          include: db.Language
        })

        //check whether this user has been favorited
        const favorite = await db.Favorites.findOne({
          where: { [Op.and]: [{ userId: users[i].dataValues.id }, { activeUserId: input.activeUserId }] }
        })
        if (favorite) {
          users[i].dataValues.isFavorited = true;
        } else {
          users[i].dataValues.isFavorited = false;
        }

        let languages = [];

        languagesArray.languages.forEach(language => {
          languages.push({
            id: language.dataValues.id,
            name: language.dataValues.name,
          })
        })

        const interestsArray = await db.User.findOne({
          where: { email: users[i].dataValues.email },
          include: db.Interests
        })

        let interests = [];

        interestsArray.interests.forEach(interest => {
          interests.push({
            id: interest.dataValues.id,
            name: interest.dataValues.name,
          })
        })

        users[i].dataValues.languages = languages;
        users[i].dataValues.interests = interests;

        returnedUsers.push(users[i].dataValues);
      }

      return returnedUsers
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
    async chats(_, { input }, { db }) {
      // finds the friends based on the user1Id which will return the friends based on the foriegn key association
      const chats = await db.Chats.findAll({ where: { user1Id: input.id } })
      return chats
      // get list of chats based on user id from input
    },
    async experiences(_, { input }, { db }) {
      // get list of experiences based on user id from input
      const experience = await db.user_experiences.findAll({ where: { userId: input.id } })
      return experience
      // return experiences;
    },
    async userAlbums(_, { input }, { db }) {
      const photos = await db.UserAlbum.findAll({ where: { userId: input.id } })
      return photos
      // get list of photos based on user id from input
      // return photos;
    },
    async messages(_, { input }, { db }) {
      const messages = await db.Messages.findAll({ where: { chatId: input.chatId } })
      return messages
      // get list of photos based on favourite id from input
      // return messages;
    }
  },
  Mutation: {
    async user(_, { input }, { db }) {

      //if the user is new so yet to receive ID
      if (!input.id) {
        const user = await db.User.create({
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
        user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);

        //add languages and interests to user
        for (let i = 0; i < input.languages.length; i++) {
          await user.addLanguage(input.languages[i], user.dataValues.id);
        }
        for (let i = 0; i < input.interests.length; i++) {
          await user.addInterests(input.interests[i], user.dataValues.id);
        }

        const languagesArray = await db.User.findOne({
          where: { email: user.dataValues.email },
          include: db.Language
        })

        let languages = [];

        languagesArray.languages.forEach(language => {
          languages.push({
            id: language.dataValues.id,
            name: language.dataValues.name,
          })
        })

        const interestsArray = await db.User.findOne({
          where: { email: user.dataValues.email },
          include: db.Interests
        })

        let interests = [];

        interestsArray.interests.forEach(interest => {
          interests.push({
            id: interest.dataValues.id,
            name: interest.dataValues.name,
          })
        })

        user.dataValues.languages = languages;
        user.dataValues.interests = interests;
        user.dataValues.chats = [];

        return user.dataValues

        // } else if (!input.email) {
        //   const user = await db.User.destroy({ where: { id: input.id } })
        //   user.removeLanguage();
        //   user.removeInterests();
        //   user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);
        //   return user
      } else {
        const user = await db.User.update({
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
        }, { where: { id: input.id } })

        if (input.dob) {
          user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);
        }

        return { id: input.id }
      }
    },
    async experiences(_, { input }, { db }) {
      if (!input.id) {
        const experience = await db.Experiences.create({
          userId: input.userId,
          title: input.title,
          description: input.description
        })
        return experience
        //add experience to experiences table
      } else if (!input.title) {
        const experience = await db.Experiences.destroy({ id: input.id })
        return []
        //delete experience from experiences table
      } else {
        const experience = await db.Experiences.update({
          userId: input.userId,
          title: input.title,
          description: input.description
        }, { where: { id: input.id } })
        return experience
        //edit experience in experiences tables
      }
      // return experiences;
    },
    async userAlbums(_, { input }, { db }) {
      if (input.id) {
        const photo = await db.UserAlbum.destroy({ where: { id: input.id } })
        return photo
      }
      const photo = await db.UserAlbum.create({ imageURL: input.imageURL, userId: input.userId })
      return photo
    },
    // return photo;

    async messages(_, { input }, { db }) {
      // add message to db using input
      let message;
      if (input.chatId) {
        message = await db.Messages.create({
          chatId: input.chatId,
          authorId: input.senderId,
          content: input.content
        })
      }
      else {
        const chat = await db.Chats.create({
          userId: input.recieverId,
          user1Id: input.senderId,
        })

        const chatID = chat.dataValues.id.toString();
        message = await db.Messages.create({
          chatId: chatID,
          authorId: input.senderId,
          content: input.content
        })
      }
      return message;
    },

    async favorites(_, { input }, { db }) {

      const favorite = await db.Favorites.findOne({
        where: { [Op.and]: [{ userId: input.targetUserId }, { activeUserId: input.userId }] }
      })

      //toggle favorites on or off - delete if it is found or create
      if (favorite) {
        await db.Favorites.destroy({
          where: {
            id: favorite.dataValues.id
          }
        })
      } else {
        await db.Favorites.create({
          activeUserId: input.userId,
          userId: input.targetUserId,
        })
      }

      return;
    },
    async languages(_, { input }, { db }) {
      if (input.id) {
        const languages = await db.users_languages.destroy({ where: { id: input.id } })
        // remove from languages
        return languages
      } else {
        // add to languages
        const language = await db.users_langauges.create({ userId: input.UserId, name: input.name })
        return language
      }
    },
    async bulkCreateInterests(_, __, { db }) {
      const bulkInterests = await db.Interests.bulkCreate([{ name: "rock-climbing" }, { name: "skiing" }, { name: "singing" }, { name: "cooking" }])
      return;
    },
    bulkCreateLanguages(_, __, { db }) {
      const bulkLanguages = db.Language.bulkCreate([{ name: "English" }, { name: "Japanese" }, { name: "Russian" }, { name: "Urdu" }])
      return;
    }
  }
}

function calculateAgeFromBirthdate(birthdate) {
  const currentTime = new Date();
  const currentDay = currentTime.getDate();
  const currentMonth = currentTime.getMonth() + 1;
  const currentYear = currentTime.getFullYear();

  const birthDay = Number(birthdate.slice(8, 10));
  const birthMonth = Number(birthdate.slice(5, 7));
  const birthYear = Number(birthdate.slice(0, 4));

  let postBirthdayInCurrentYear = 1;
  if (birthMonth > currentMonth || birthMonth === currentMonth && birthDay > currentDay) postBirthdayInCurrentYear = 0;

  return currentYear - birthYear + postBirthdayInCurrentYear - 1;
};
