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

      let languages: Array<{ id: String, name: String }> = [];

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

      let interests: Array<{ id: String, name: String }> = [];

      interestsArray.interests.forEach(interest => {
        interests.push({
          id: interest.dataValues.id,
          name: interest.dataValues.name,
        })
      })

      const favoritesInfoFromDb = await db.Favorites.findAll({ where: { user1Id: "51" } });

      let favorites: Array<{ id: String, userId: String, user1Id: String }> = [];

      favoritesInfoFromDb.forEach(favorite => {
        favorites.push({
          id: favorite.dataValues.id,
          userId: favorite.dataValues.userId,
          user1Id: favorite.dataValues.user1Id,
        });
      })

      user.dataValues.languages = languages;
      user.dataValues.interests = interests;
      user.dataValues.favorites = favorites;

      return user.dataValues;
    },
    users(_, { input }, { db }) {
      const users = db.User.findAll()
      //{ where: { location: input.location, interest: input.interest}}
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
      const favorites = await db.Favorites.findAll({ where: { user1Id: input.id } })
      return favorites
      // get list of favourites based on user id from input
      // return favorites;
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
      const messages = await db.Messages.findAll({ where: { favoriteId: input.id } })
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

        let languages: Array<{ id: String, name: String }> = [];

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

        let interests: Array<{ id: String, name: String }> = [];

        interestsArray.interests.forEach(interest => {
          interests.push({
            id: interest.dataValues.id,
            name: interest.dataValues.name,
          })
        })

        user.dataValues.languages = languages;
        user.dataValues.interests = interests;
        user.dataValues.favorites = [];

        return user.dataValues

      } else if (!input.email) {
        const user = await db.User.destroy({ where: { id: input.id } })
        user.removeLanguage();
        user.removeInterests();
        user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);
        return user
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
        user.dataValues.dob = calculateAgeFromBirthdate(user.dataValues.dob);

        return user
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
      const message = await db.Messages.create({
        favoriteid: input.favoriteid,
        userid: input.userid,
        content: input.content
      });

      return message;
    },
    async favorites(_, { input }, { db }) {
      if (input.id) {
        const favorites = await db.Favorites.destroy({ where: { id: input.id } })
        return favorites
        // remove from favorite
      } else {
        // add to favorites
        const favorite = await db.Favorites.create({ userId: input.favoriteId, user1Id: input.user1Id })
        return favorite
      }
      // return favorites;
    },
    async languages(_, { input }, { db }) {
      if (input.id) {
        const languages = await db.users_languages.destroy({ where: { id: input.id } })
        // remove from favorite
        return languages
      } else {
        // add to favorites
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

function calculateAgeFromBirthdate(birthdate: String): Number {
  const currentTime = new Date();
  const currentDay: number = currentTime.getDate();
  const currentMonth: number = currentTime.getMonth() + 1;
  const currentYear: number = currentTime.getFullYear();

  const birthDay: number = Number(birthdate.slice(8, 10));
  const birthMonth: number = Number(birthdate.slice(5, 7));
  const birthYear: number = Number(birthdate.slice(0, 4));

  let postBirthdayInCurrentYear: number = 1;
  if (birthMonth > currentMonth || birthMonth === currentMonth && birthDay > currentDay) postBirthdayInCurrentYear = 0;

  return currentYear - birthYear + postBirthdayInCurrentYear - 1;
};
