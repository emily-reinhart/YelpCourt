require('dotenv').config();

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	Court = require('./models/court'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	seedDB = require('./seeds');

// Requiring Routes
var indexRoutes = require('./routes/index'),
	commentRoutes = require('./routes/comments'),
	courtRoutes = require('./routes/courts');

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('Connected to DB');
	})
	.catch((err) => {
		console.log('ERROR', err.message);
	});
// mongoose.connection.once('open', () => {
// 	console.log('MongoDB Connected');
// });
// mongoose.connection.on('error', (err) => {
// 	console.log('MongoDB connection error: ', err);
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); // Seed the database

app.locals.moment = require('moment');

// PASSPORT Config
app.use(
	require('express-session')({
		secret: 'Once again Zoe is cutest cat',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use(indexRoutes);
app.use('/courts/:id/comments', commentRoutes);
app.use('/courts', courtRoutes);

var port = process.env.PORT || 3000;
app.listen(port, process.env.IP, function () {
	console.log('YelpCamp Server Has Started');
});
