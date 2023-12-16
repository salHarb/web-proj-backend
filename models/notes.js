const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: String,
  desc: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  date: Date,
});


module.exports = mongoose.model('note', notesSchema)