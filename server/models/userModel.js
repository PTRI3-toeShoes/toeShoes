const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO - ADD BCRYPT
// username: {type: String, required: true, unique: true},

const userSchema = new Schema({
  email: {type: String, unique: true},
  password: {type: String, required: true},
  favorites: {type: Array}
});

module.exports = mongoose.model('User', userSchema);