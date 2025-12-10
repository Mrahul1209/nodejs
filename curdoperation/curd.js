
const express = require("express");

const PORT = 12000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());


let allUsers = [
    {
        id: 12,
        name: "rahul",
        email: "rm05354@gmail.com",
        password: "rahul@2006",
        phone: 53978722612,
        address: "Surat",
    },
    {
        id: 13,
        name: "nick",
        email: "nick1234@gmail.com",
        password: "nick66413",
        phone: 4879721546,
        address: "ahmedabad",
    },

    {
        id: 14,
        name: "kishan",
        email: "kishan0234@gmail.com",
        password: "kishan77493",
        phone: 12565421546,
        address: "amreli",
    },

    {
        id: 15,
        name: "ankit",
        email: "ankit1234@gmail.com",
        password: "ankit98863313",
        phone: 984794271612,
        address: "bhavnagar",
    }
];

let id = 103;

app.get("/", (req, res) => {
    return res.render('table', {
        name: "rahul",
        allUsers
    });
});

app.get("/addUserPage", (req, res) => {
    return res.render(`view`);
});

app.post("/addUser", (req, res) => {
    const user = req.body;


    user.id = id;
    id++;

    allUsers.push(user)

    return res.redirect('/');
});

app.get("/editPage", (req, res) => {
    console.log(req.query);

    const user = allUsers.find((user) => user.id == req.query.userId);

    if (!user) {
        return res.redirect('/not-found');
    }

    return res.render('edit', {
        user
    });
});

app.post("/updateUser", (req, res) => {
    console.log(req.body);

    allUsers = allUsers.map((user) => {
        if (user.id == req.body.id) {
            return req.body;
        } else {
            return user;
        }
    })

    return res.redirect('/');
});

app.get("/deleteUser", (req, res) => {
    console.log(req.query);
    const userId = req.query.userId;

    allUsers = allUsers.filter((user) => user.id != userId);

    console.log(allUsers);

    return res.redirect('/')
});

app.get('/not-found', (req, res) => {
    return res.render('not_found');
})


app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not started...", err);
        return false;
    }
    console.log("Server is started...");
});