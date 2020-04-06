const { Schema, model } = require('mongoose');
const moment = require('moment');

//create schema for messages
const MessageSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: moment().format("YYYY-MM-DD h:mm a")
  }
});

module.exports = User = model('user', MessageSchema);