const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: String,
  email:String,
  username: String,
  password: String,
  avatar: String,
});


module.exports = mongoose.model('user', usersSchema)