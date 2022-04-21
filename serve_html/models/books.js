const mongoose = require("mongoose"),
    bookSchema = mongoose.Schema({
        title: String,
        author: String,
        bookid: String,
        url: String,
    });
module.exports = mongoose.model("Book", bookSchema);