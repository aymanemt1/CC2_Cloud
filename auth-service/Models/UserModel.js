const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  
  nom: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  mdp: {
    type: String,
    required: true,
    unique: true
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
