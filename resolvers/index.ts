const { Op } = require("sequelize");
const axios = require('axios');
require('dotenv').config();


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

      const imagesArray = await db.User.findOne({
        where: { email: user.dataValues.email },
        include: db.UserAlbum
      })
      let images = [];
      for (let i = 0; i < imagesArray.dataValues.userAlbums.length; i++) {
        images.push({
          photoId: imagesArray.dataValues.userAlbums[i].dataValues.id,
          imageUrl: imagesArray.dataValues.userAlbums[i].dataValues.imageURL
        })
      }

      const idStr = user.dataValues.id.toString()
      const chatsList = await db.Chats.findAll({ where: { [Op.or]: [{ user1Id: idStr }, { userId: idStr }] } });

      let chats = [];
      chatsList.forEach(async chat => {
        let id = chat.dataValues.userId.toString();
        if (user.dataValues.id.toString() === chat.dataValues.userId.toString()) id = chat.dataValues.user1Id
        const friend = db.User.findOne({ where: { id: id } })
        chats.push({
          id: chat.dataValues.id,
          userId: chat.dataValues.userId,
          user1Id: chat.dataValues.user1Id,
          profile: friend
        });
      })

      const rating = calcRating(user.dataValues.id, db);

      user.dataValues.languages = languages;
      user.dataValues.interests = interests;
      user.dataValues.chats = chats;
      user.dataValues.userAlbum = images;
      user.dataValues.rating = rating;

      return user.dataValues;
    },
    async users(_, { input }, { db }) {
      const users = await db.User.findAll({ where: { city: input.city } })

      const returnedUsers = [];

      //using for loop instead of forEach as forEach does not work asynchronously
      for (let i = 0; i < users.length; i++) {
        users[i].dataValues.dob = calculateAgeFromBirthdate(users[i].dataValues.dob);

        //check whether this user has been favorited
        const favorite = await db.Favorites.findOne({
          where: { [Op.and]: [{ userId: users[i].dataValues.id }, { activeUserId: input.activeUserId }] }
        })
        if (favorite) {
          users[i].dataValues.isFavorited = true;
        } else {
          users[i].dataValues.isFavorited = false;
        }

        const languagesArray = await db.User.findOne({
          where: { email: users[i].dataValues.email },
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

        const imagesArray = await db.User.findOne({
          where: { email: users[i].dataValues.email },
          include: db.UserAlbum
        })
        let images = [];
        for (let i = 0; i < imagesArray.dataValues.userAlbums.length; i++) {
          images.push({
            photoId: imagesArray.dataValues.userAlbums[i].dataValues.id,
            imageUrl: imagesArray.dataValues.userAlbums[i].dataValues.imageURL
          })
        }

        const rating = calcRating(users[i].dataValues.id, db);

        users[i].dataValues.languages = languages;
        users[i].dataValues.interests = interests;
        users[i].dataValues.userAlbum = images;
        users[i].dataValues.rating = rating;
        returnedUsers.push(users[i].dataValues);
      }
      return returnedUsers
    },
    async languages(_, __, { db }) {
      const langauges = await db.Language.findAll();
      return langauges
    },
    async interests(_, __, { db }) {
      const interests = await db.Interests.findAll();
      return interests
    },
    async chats(_, { input }, { db }) {
      // finds the friends based on the user1Id which will return the friends based on the foriegn key association
      const chats = await db.Chats.findAll({ where: { user1Id: input.id } })
      return chats
    },
    async userAlbums(_, { input }, { db }) {
      const photos = await db.UserAlbum.findAll({ where: { userId: input.id } })
      return photos
    },
    async messages(_, { input }, { db }) {
      const messages = await db.Messages.findAll({ where: { chatId: input.chatId } })
      return messages
      // get list of photos based on favourite id from input
      // return messages;
    },
    async places(_, { input }, __) {
      const { lat, lng } = input;
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50000&type=tourist_attraction&key=${process.env.API_KEY}`)
      let results = await response.data.results;
      return results;
    },
    async reviews(_, { input }, { db }) {
      const reviews = await db.Reviews.findAll({ where: { id: input.id } })

      // get the info of the users who left the review

      let returnedReviews = [];

      for (let i = 0; i < reviews.length; i++) {
        const author = await db.User.findOne({ where: { id: reviews[i].dataValues.authorId } })

        returnedReviews.push({
          id: reviews[i].dataValues.id,
          rating: reviews[i].dataValues.rating,
          content: reviews[i].dataValues.content,
          createdAt: reviews[i].dataValues.createdAt,
          profile: {
            id: author.dataValues.id,
            firstName: author.dataValues.firstName,
            profileImg: author.dataValues.profileImg
          }
        });
      }

      return returnedReviews;
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

        for (let i = 0; i < input.userAlbum.length; i++) {
          let image = input.userAlbum[i];
          await db.UserAlbum.create({
            userId: user.dataValues.id,
            imageURL: image,
          })

        }
        const imagesArray = await db.UserAlbum.findAll({
          where: { userId: user.dataValues.id }
        })
        let images = [];
        imagesArray.forEach(image => {
          images.push({
            photoId: image.dataValues.id,
            imageUrl: image.dataValues.imageURL,
          })
        })

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
        user.dataValues.userAlbum = images;
        user.dataValues.chats = [];
        return user.dataValues

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
    async userAlbums(_, { input }, { db }) {
      if (input.id) {
        const photo = await db.UserAlbum.destroy({ where: { id: input.id } })
        return photo
      }
      const photo = await db.UserAlbum.create({ imageURL: input.imageURL, userId: input.userId })
      return photo
    },
    async messages(_, { input }, { db }) {
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
    async reviews(_, { input }, { db }) {
      const review = await db.Reviews.create({
        userId: input.userId,
        authorId: input.authorId,
        rating: input.rating,
        content: input.content
      })

      const author = await db.User.findOne({ where: { id: input.authorId } })

      return {
        id: review.dataValues.id,
        rating: review.dataValues.rating,
        content: review.dataValues.content,
        profile: {
          id: author.dataValues.id,
          firstName: author.dataValues.firstName,
          profileImg: author.dataValues.profileImg
        }
      }
    },
    async bulkCreateInterests(_, __, { db }) {
      await db.Interests.bulkCreate([{ name: "Rock-climbing" }, { name: "Skiing" }, { name: "Singing" }, { name: "Cooking" }])
      return;
    },
    bulkCreateLanguages(_, __, { db }) {
      db.Language.bulkCreate([{ name: "English" }, { name: "Japanese" }, { name: "Russian" }, { name: "Urdu" }])
      return;
    }
  },

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

async function calcRating(userId, db) {
  const reviews = await db.Reviews.findAll({ where: { userId: userId } })

  //if a user has no review the default rating is 4
  if (reviews.length === 0) {
    return 4;
  }

  let ratingSum = 0;
  let ratingCount = 0;

  reviews.forEach(review => {
    ratingSum += review.dataValues.rating;
    ratingCount++;
  })

  const ratingTimes10 = (ratingSum / ratingCount) * 10;

  const ratingToNearest5 = Math.round(ratingTimes10 / 5) * 5;

  return ratingToNearest5 / 10;
}
