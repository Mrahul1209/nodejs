const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Admin = require('../model/admin.model');

passport.use("localadmin", new LocalStrategy({
    usernameField: 'email',

}, async (email, password, done) => {
    const admin = await Admin.findOne({ email });

    console.log(admin);

    if (!admin) {
        return done(null, false);
    }

    if (password != admin.password) {
        return done(null, false)
    }

    return done(null, admin);
}));


passport.serializeUser((admin, done) => {
    console.log("admin id", admin);

    return done(null, admin.id)
});

passport.deserializeUser(async (adminid, done) => {
    console.log("deserialize :", adminid);

    const admin = await Admin.findById(adminid);
    console.log("admin :", admin);

    // if (!admin) {
    //     return done(null, false);
    // }

    return done(null, admin);
});


passport.checkdone = (req, res, next) => {
    console.log("is authenticated :", req.isAuthenticated());

    console.log("Done");
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/');
}


passport.checknotdone = (req, res, next) => {
    console.log("is authenticated :", req.isAuthenticated());

    if (!req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/dashboard');
}

passport.trueadmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
    }
    return next();
}