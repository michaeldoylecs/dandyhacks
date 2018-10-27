const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: String,
  name: String,
  sentMessages: [{ message: String, sender: String, recipient: String }],
  receivedMessages: [{ message: String, sender: String, recipient: String }],
});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
