const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');
//import user model
const User = require('../../models/User');
///@route  POST api/users
//@desc    Register User
//@access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });
      //if exists send back error
      if (user) {
       return res.status(400).json({ errors: [{ msg: 'User already exists!' }] });
      }
      //get user's gravatar(based on email)
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      //create new instance of user
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //encrypt password using bcrypt before saving new user
      //salt before hash
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //save user with hashed password
      await user.save();

      //return json web token
      const payload = {
        user:{
          //mongoose lets you access it as .id and not ._id
          id: user.id
        }
      }
      //sign token with secret
      jwt.sign(payload, config.get('jwtSecret') ,{
        //long expiration for development
        expiresIn: 3600000
      }, (err,token)=> {
        if(err){throw err}
        //return our token to client with user id payload
        res.json({token})
      })
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
