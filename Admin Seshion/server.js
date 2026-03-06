const express = require('express');
const path = require('path');
require('./config/db.config');


const cookieparser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const { setFlash } = require('./middalware/connect.flash.middleware');

require('./middalware/passport.local.middal');

const app = express();

const PORT = 12000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(flash());

app.use(cookieparser());

app.use(session({
    name: "admin",
    secret: "admin1212@gmail#$%",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxage: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.trueadmin);

app.use(setFlash);


app.use('/', require('./routes/route'));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not started...", err);
        return;
    }
    console.log("Server is started !!!!!!");
});