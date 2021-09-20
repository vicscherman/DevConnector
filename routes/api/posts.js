const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

///@route  POST api/posts
//@desc    Create a post
//@access  Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

///@route  Get api/posts
//@desc    get all post
//@access  Private(need to be logged in)

router.get('/', auth, async (req, res) => {
  try {
    //sort by newest posts
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.eror(err.message);
    res.status(500).send('Server Error');
  }
});

///@route  Get api/posts/:id
//@desc    get post by Id
//@access  Private(need to be logged in)

router.get('/:id', auth, async (req, res) => {
  try {
    //sort by newest posts
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    //if it's an invalid objectId
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

///@route  DELETE api/posts/:id
//@desc    delete a post by ID
//@access  Private(need to be logged in)

router.delete('/:id', auth, async (req, res) => {
  try {
    //find requested post
    const post = await Post.findById(req.params.id);

    //Check that post exists

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    //Check that user requesting delete is post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post Deleted' });
  } catch (err) {
    console.error(err.message);
    //if it's an invalid objectId
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

///@route  Put api/posts/like/:id
//@desc   Like a post by ID
//@access  Private(need to be logged in)

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post has already been liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked by this user' });
    }
    //add like
    post.likes.unshift({ user: req.user.id });
    //save post
    await post.save();
    //return all likes
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

///@route  Put api/posts/like/:id
//@desc   Like a post by ID
//@access  Private(need to be logged in)

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check if the post has already been liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "Post hasn't been liked by this user" });
    }
    //get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    //splice out like
    post.likes.splice(removeIndex, 1);

    //save post
    await post.save();
    //return all likes
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
