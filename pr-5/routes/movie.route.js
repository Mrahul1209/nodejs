const express = require("express");
const multer = require("multer");
const {
    movieForm,
    addMovie,
    allMovies,
    deleteMovie,
    editMoviePage,
    updateMovie
} = require("../controllers/movie.controller");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.get("/", movieForm);
router.post("/addMovie", upload.single("poster_image"), addMovie);
router.get("/allMovies", allMovies);
router.get("/deleteMovie", deleteMovie);
router.get("/editMovie/:id", editMoviePage);
router.post("/updateMovie", upload.single("poster_image"), updateMovie);

module.exports = router;
