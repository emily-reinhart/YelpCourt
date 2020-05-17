var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// ROOT Route
router.get('/', function (req, res) {
	res.render('landing');
});

// Signup Form
router.get('/register', function (req, res) {
	res.render('register', { page: 'register' });
});
// Signup Logic
router.post('/register', function (req, res) {
	var newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, function () {
			req.flash('success', 'Welcome to YelpCamp ' + user.username + '!');
			res.redirect('/courts');
		});
	});
});

// Login Form
router.get('/login', function (req, res) {
	res.render('login', { page: 'login' });
});
// Login Logic
router.post(
	'/login',
	passport.authenticate('local', {
		// successRedirect: '/courts',
		failureRedirect: '/login',
		failureFlash: true
	}),
	function (req, res) {
		var returnTo = req.session.returnTo ? req.session.returnTo : '/courts';
		delete req.session.returnTo;
		res.redirect(returnTo);
	}
);

// Logout Route
router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success', 'Logged You Out!');
	res.redirect('/courts');
});

module.exports = router;
