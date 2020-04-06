const express = require('express');
const router = express.Router();

const Message = require('../../model/Message');
const User = require('../../model/User');
const auth = require('../../middleware/auth');

router.post('/', auth, (req, res) => {
  const { username } = req.user;
  const { message } = req.body;
  if (!message)
    return res.status(422).json({
      msg: 'Message is required',
    })

  const newMessage = new Message({
    username,
    message,
  });

  newMessage.save()
    .then(message => res.json(message))
    .catch(err => res.status(400).json(err))

})

router.get('/', auth, (req, res) => {

  Message.find({
    "created_at": { "$gt": req.user.created_at }
  })
    .sort({
      created_at: 1
    })
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json(err))

})

module.exports = router;