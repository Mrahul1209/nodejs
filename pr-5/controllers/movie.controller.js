const Movie = require("../models/movie.model");
const fs = require("fs");

const movieForm = (req, res) => {
    res.render("addmovie");
};

const addMovie = async (req, res) => {
    try {
        req.body.poster_image = req.file.path;
        await Movie.create(req.body);
        return res.redirect("/allMovies");
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
};

const allMovies = async (req, res) => {
    const movies = await Movie.find();
    return res.render("allmovies", { movies });
};

const deleteMovie = async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.query.id);
    fs.unlink(movie.poster_image, () => { });
    return res.redirect("/allMovies");
};

const editMoviePage = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    return res.render("updatemovie", { movie });
};

const updateMovie = async (req, res) => {
    try {
        const oldMovie = await Movie.findById(req.body.movie_id);
        let data = {
            ...req.body,
            duration: Number(req.body.duration),
            release_year: Number(req.body.release_year),
            rating: Number(req.body.rating)
        };

        if (req.file) {
            if (oldMovie.poster_image && fs.existsSync(oldMovie.poster_image)) {
                fs.unlinkSync(oldMovie.poster_image);
            }
            data.poster_image = req.file.path;
        }

        await Movie.findByIdAndUpdate(req.body.movie_id, data);
        return res.redirect("/allMovies");
    } catch (err) {
        console.log(err);
        return res.redirect("/allMovies");
    }
};

module.exports = {
    movieForm,
    addMovie,
    allMovies,
    deleteMovie,
    editMoviePage,
    updateMovie
};
