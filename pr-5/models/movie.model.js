const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: String,
    director: String,
    genre: String,
    language: String,
    duration: Number,
    release_year: Number,
    rating: Number,
    description: String,
    poster_image: String
});

module.exports = mongoose.model("Movie", movieSchema);
