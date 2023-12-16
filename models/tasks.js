const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  desc: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: Date,
});


module.exports = mongoose.model('task', taskSchema)