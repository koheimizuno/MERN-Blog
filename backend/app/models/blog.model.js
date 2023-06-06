const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema({
    user_id: String,
    user_email: String,
    title: String,
    text: String,
    image: String,
    watchs: Number,
    likes: Number,
    created_date: { type: Date, default: Date.now },
  })
);

module.exports = Blog;
