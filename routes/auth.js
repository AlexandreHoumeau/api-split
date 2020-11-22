const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {registerValidation, loginValidation} = require('../validations/authValidation')


router.post('/register', async (req, res) => {
  //Validate request body
  const { error } = await registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  //Check if userr exist in DB
  const userExist = await User.findOne({email: req.body.email})
  if(userExist) return res.send('Email exist already')

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  })

  try {
    const savedUser = await newUser.save()
    res.status(200).send(savedUser)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  //Validate request body
  const { error } = await loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message)

  //Check if userr exist in DB
  const user = await User.findOne({email: req.body.email})
  if(!user) return res.send('Email or password wrong');

  //Check if password is correct
  const comparePassword = await bcrypt.compare(req.body.password, user.password)
  if(!comparePassword) return res.send('Email or password wrong');

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token)    
})

module.exports = router;