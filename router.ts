import express from'express'; 
import {db} from'./models/index'
const { Router } = express
const router =  Router();


router.get('/user', async (req, res) => {
  console.log('here')
  const userInfo = await db.User.create({
    firstName: "Andy",
    lastName: "A",
    email: "andy@test.com",
    dob: "1990-01-01",
    password: "password",
    guide: true,
    location: "London",
    gender: "MALE",
    summary: "Test summary",
    profileImg: "Test profileImg",
    headerImg: "Test headerImg",
  })
  res.status(200).send(userInfo)
})

export = router