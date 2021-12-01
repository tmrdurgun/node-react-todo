const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  id: { type: String },
  title: { type: String },
  desc: { type: String },
  status: { type: Boolean },
});

module.exports = mongoose.model('todo', todoSchema);