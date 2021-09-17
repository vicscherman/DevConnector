const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

///@route  GET api/profile/me
//@desc    Get current user's profile
//@access  Private
router.get('/me', auth, async (req, res) => {
  try {
    //find profile based off of user model field in profile
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

///@route  POST api/profile/
//@desc    Create or update user profile
//@access  Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is Required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { skills, youtube, facebook, twitter, instagram, linkedin } =
      req.body;

    //build profile object with nested social object

    const profileFields = {
      ...req.body,
      user: req.user.id,
      skills: skills.split(',').map((skill) => skill.trim()),
      social: { youtube, twitter, facebook, linkedin, instagram },
    };
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          //update operator
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //Create if not found
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

///@route  GET api/profile/
//@desc    get all profiles
//@access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

///@route  GET api/profile/user/:uid
//@desc    GET profile by user ID
//@access  Public

module.exports = router;

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

///@route  DELETE api/profile/
//@desc    DELETE profile,user, posts
//@access  Private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo = remove users posts
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User successfully deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

///@route  PUT api/profile/experience
//@desc    Add profile experience
//@access  Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;
    //spread out request object to get access to all properties
    const newExp = { ...req.body };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/profile/experience/:exp_id
// @desc    Edit profile experience
// @access  Private
router.put(
  '/experience/:exp_id',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;
    // since title, company, from are required
    const exp = { title, company, from };
    if (location) exp.location = location;
    if (to) exp.to = to;
    if (current) exp.current = current;
    if (description) exp.description = description;

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id, 'experience._id': req.params.exp_id },
        {
          $set: {
            // I don't want my experience id to change
            'experience.$': { _id: req.params.exp_id, ...exp },
          },
        },
        { new: true }
      );
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    //splice out that index  
    profile.experience.splice(removeIndex, 1);
    //save and send response
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


///@route  PUT api/profile/education
//@desc    Add profile education
//@access  Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
      check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    //spread out request object to get access to all properties
    const newEdu = { ...req.body };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Delete api/profile/education/:edu_id
// @desc    Delete profile education
// @access  Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    //splice out that index  
    profile.education.splice(removeIndex, 1);
    //save and send response
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/education/:edu_id
// @desc    Edit profile education
// @access  Private
router.put(
  '/education/:edu_id',
  [
    auth,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description} =
      req.body;
    // since title, company, from are required
    const edu = { school, degree,fieldofstudy,from };
    if (school) edu.school = school;
    if (degree) edu.degree = degree;
    if (fieldofstudy) edu.fieldofstudy = fieldofstudy;
    if (from) edu.from = from;
    if (to) edu.to = to;
    if (current) edu.current = current;
    if (description) edu.description = description;

    try {
      const profile = await Profile.findOneAndUpdate(
        { user: req.user.id, 'education._id': req.params.edu_id },
        {
          $set: {
            // I don't want my education id to change
            'education.$': { _id: req.params.edu_id, ...edu },
          },
        },
        { new: true }
      );
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);






module.exports = router;
