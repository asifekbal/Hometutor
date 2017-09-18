var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var dbUrl = 'mongodb://localhost:27017/hometutor';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var User = require('../models/user');
var mailer = require('../public/config/mailer');


router.get('/dashboard', function(req, res, next) {
    res.render('dashboard', {
        title: 'Dashboard'
    });
});

router.get('/pre_register', function(req, res, next) {
    res.render('pre_register', {
        title: 'Pre Registration'
    });
});

router.post('/pre_register', function(req, res, next) {
    req.session.firstName = req.body.firstName,
        req.session.lastName = req.body.lastName,
        req.session.emailId = req.body.emailId,
        req.session.password = req.body.password
    res.render('register', {
        title: 'Complete Registration'
    });
});

router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Registration'
    });
});

router.post('/register', function(req, res, next) {
    var newUser = new User({
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        emailId: req.session.emailId,
        password: req.session.password,
        mobileNo: req.body.mobileno,
        qualification: req.body.qualification,
        dateofbirth: req.body.dateofbirth,
        sex: req.body.sex,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        postal: req.body.postal,
        country: req.body.country
    });
    User.createUser(newUser, function(err, user) {
        if (err)
            throw err;
    });
    req.flash('success_msg', "You're Successfully registered");
    res.render('index', {
        title: 'Login'
    })
});

router.get('/login', function(req, res, next) {
    res.render('index', {
        title: 'Login'
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/',
    failureFlash: true
}));

router.get('/logout', function(req, res) {

        req.logout();
        req.flash('success_msg','Successfully logged out!' );
        res.redirect('/users/login');
});

passport.use(new LocalStrategy({
    usernameField: 'emailId'
}, function(emailId, password, done) {
    User.getUserByEmailId(emailId, function(err, user) {
        if (err) {
            throw err;
        }
        if (!user) {
            return done(null, false, {
                message: 'Incorrect emailId.'
            });
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
            if (err)
                throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
module.exports = router;
