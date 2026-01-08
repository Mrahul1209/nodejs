const express = require("express");
const path = require("path");
require("./config/db.config");

const app = express();
const port = 12000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Serve static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public"))); // <-- CSS/JS


// Routes
app.use("/", require("./routes/movie.route"));

app.listen(port, () => {
    console.log("🎬 Movie Management Server Started");
});
