const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
///@route  GET api/auth
//@desc    Test ROUTE
//@access  Public
router.get('/', auth, async (req, res) => {
  try {
    //find user by id, don't return the password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//@Route POST api/auth
//@desc  authenticate user and get token
//@access Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });
      //if exists send back error
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      //we need to match the email to the hashed password we have in our db
      //we can use bcrypt compare
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //return json web token
      const payload = {
        user: {
          //mongoose lets you access it as .id and not ._id
          id: user.id,
        },
      };
      //sign token with secret
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          //long expiration for development
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          //return our token to client with user id payload
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
