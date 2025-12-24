const express = require("express");
require('./config/db.config');
const Book = require('./model/book.model.js');
const fs = require('fs');


const app = express();

const port = 12000;

app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    const allBooks = await Book.find();
    return res.render('table', { allBooks });
});


// show table
app.get("/addBookpage", (req, res) => {
    res.render('form');
});

// insertbook
app.post('/addBook', async (req, res) => {
    console.log(req.body);


    const bookAdded = await Book.create(req.body);

    console.log(bookAdded);

    if (bookAdded) {
        console.log("Book inserted Successfully...");
    } else {
        console.log("Book insertion failed...");
    }
    return res.redirect('/');

});


// Edit Route
app.get('/editBook/:bookId', async (req, res) => {
    console.log(req.params);

    const book = await Book.findById(req.params.bookId);

    console.log(book);


    return res.render('edit', { book });


});

// Update Book Logic
app.post('/updateBook', async (req, res) => {
    console.log(req.body); // 🔍 Add this to debug

    const updatedData = await Book.findByIdAndUpdate(req.body.id, req.body, { new: true });

    if (updatedData) {
        return res.redirect('/');
    } else {
        return res.redirect('/editBook/' + req.body.id);
    }
});


// Delete Book Logic
app.get('/deleteBook', async (req, res) => {
    console.log(req.query);

    const deletedBook = await Book.findByIdAndDelete(req.query.bookId);

    console.log("Deleted Book : ", deletedBook);

    fs.unlink(deletedBook.book_image, (err) => { });

    if (deletedBook) {
        console.log("Book deleted successfully...");
    } else {
        console.log("Book deletion failed...");
    }
    return res.redirect('/');
});




app.listen(port, (err) => {
    if (err) {
        console.log("server is not started !!!", err);
        return false;
    }
    else {
        console.log("server is started  !!!!");

    }
})


