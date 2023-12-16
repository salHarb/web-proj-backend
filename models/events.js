const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  desc: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  date: Date,
});


module.exports = mongoose.model('event', eventSchema)