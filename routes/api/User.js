const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../../model/User');

const jwtSecret = process.env.JWT_SECRET;
router.get('/', (req, res) => {
  User.find()
    .sort({ username: 1 })
    .then((users) => res.json(users));
});

router.post('/register', [
  body('username')
    .isString()
    .exists('Username is required')
    .isLength({
      min: 4,
    }).withMessage('Username must be at least 4 characters')
    .isLength({
      max: 12,
    }).withMessage('Username must be at most 12 characters')
    .notEmpty().withMessage('Username cannot be empty')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user)
        throw new Error('Username already in use');
    }),
  body('password')
    .isString()
    .exists('Password is required')
    .isLength({
      min: 4,
    }).withMessage('Password should be at least 4 characters')
    .isLength({
      max: 12,
    }).withMessage('Password should be at most 12 characters')
    .notEmpty().withMessage('Password cannot be empty'),
  body('email')
    .exists('Email is required')
    .isEmail().withMessage('Email is not valid')
    .notEmpty().withMessage('Email cannot be empty'),
], (req, res) => {
  const { username, password, email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(422).json(errors.array());

  const newUser = new User({
    username,
    email,
    password,
  })

  // create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => {
          const { username, id,created_at } = user;
          jwt.sign(
            {
              id,
              username,
              created_at,
            },
            jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                msg: 'Registration Success'
              });

            }
          )//end jwt sign

        })//end newUser promise
    })//end hash
  })//end salt

})

router.post('/login',[
  body('username')
    .isString()
    .exists('Username is required')
    .isLength({
      min: 4,
    }).withMessage('Username must be at least 4 characters')
    .isLength({
      max: 12,
    }).withMessage('Username must be at most 12 characters')
    .notEmpty().withMessage('Username cannot be empty'),
  body('password')
    .isString()
    .exists('Password is required')
    .isLength({
      min: 4,
    }).withMessage('Password should be at least 4 characters')
    .isLength({
      max: 12,
    }).withMessage('Password should be at most 12 characters')
    .notEmpty().withMessage('Password cannot be empty'),
], (req, res) => {
  const { username, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(422).json(errors.array());

  User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(422).json([{
        msg: 'Username does not exists!',
      }]);

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(422).json([{
            msg: 'Invalid credentials',
          }]);

          jwt.sign(
            {
              id: user.id,
              username: user.username,
              created_at: user.created_at,
            },
            jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                msg: 'Login Success'
              });

            }
          )//jwt sign
        })
    })

})

module.exports = router;

