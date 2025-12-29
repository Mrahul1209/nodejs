const express = require("express");
require('./config/db.config');
const travel = require('./modal/travel.modal');
const path = require('path');


const app = express();

const port = 12000;

app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));



app.get('/', (req, res) => {
    res.render('home');
});

app.get('/addtravelpage', async (req, res) => {
    const alltravel = await travel.find();
    return res.render('table', { alltravel });
});

// insertbook
app.post('/addtravel', async (req, res) => {
    console.log(req.body);


    const travelAdded = await travel.create(req.body);

    console.log(travelAdded);

    if (travelAdded) {
        console.log("travel inserted Successfully...");
    } else {
        console.log("travel insertion failed...");
    }
    return res.redirect('/addtravelpage');

});


// EDIT LOGIC
app.get('/edittravel/:id', async (req, res) => {
    const travelData = await travel.findById(req.params.id);
    console.log(req.params.id);
    
    console.log(travelData);
    res.render('edit', { travel: travelData });

});



// Update travel Logic
app.post('/updatetravel', async (req, res) => {
    try {
        const updatedData = await travel.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (updatedData) {
            console.log("Travel updated successfully:", updatedData);
            return res.redirect('/addtravelpage');
        } else {
            console.log("Travel update failed for ID:", req.body.id);
            return res.redirect('/edittravel/' + req.body.id);
        }
    } catch (err) {
        console.log("Error updating travel:", err);
        return res.redirect('/edittravel/' + req.body.id);
    }
});



// Delete Book Logic
app.get('/deletetravel', async (req, res) => {
    const deletedtravel = await travel.findByIdAndDelete(req.query.travelId);

    if (deletedtravel) {
        console.log("travel deleted successfully...");
    }

    return res.redirect('/addtravelpage');
});



app.listen(port, (err) => {
    if (err) {
        console.log("server is not started !!!!", err);
        return false;

    }
    else {
        console.log("server is started !!!!!");

    }
})
