var express = require('express');
var router = express.Router();
var Court = require('../models/court');
var middleware = require('../middleware');
var NodeGeocoder = require('node-geocoder');

var options = {
	provider: 'google',
	httpAdapter: 'https',
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null
};

var geocoder = NodeGeocoder(options);

// INDEX - Show all courts
router.get('/', function (req, res) {
	// debug, freezes code
	// eval(require('locus'));

	// pagination
	var perPage = 12;
	var pageQuery = parseInt(req.query.page);
	var pageNumber = pageQuery ? pageQuery : 1;

	// fuzzy search
	if (req.query.search) {
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Court.find({ name: regex }).skip(perPage * pageNumber - perPage).limit(perPage).exec(function (err, allCourts) {
			if (err || !allCourts.length) {
				req.flash('error', 'No matches found.');
				res.redirect('back');
			}
			else {
				Court.count().exec(function (err, count) {
					if (err) {
						console.log(err);
						res.redirect('back');
					}
					else {
						res.render('courts/index', {
							courts: allCourts,
							currentUser: req.user,
							current: pageNumber,
							pages: Math.ceil(allCourts.length / perPage),
							search: req.query.search
						});
					}
				});
			}
		});
	}
	else {
		// get all courts from DB
		Court.find({}).skip(perPage * pageNumber - perPage).limit(perPage).exec(function (err, allCourts) {
			Court.count().exec(function (err, count) {
				if (err) {
					console.log(err);
				}
				else {
					res.render('courts/index', {
						courts: allCourts,
						currentUser: req.user,
						current: pageNumber,
						pages: Math.ceil(count / perPage),
						search: false
					});
				}
			});
		});
	}

	// get all camps from db
	// Court.find({}, function (err, allCourts) {
	// 	if (err) {
	// 		console.log(err);
	// 	}
	// 	else {
	// 		res.render('courts/index', {
	// 			courts: allCourts,
	// 			currentUser: req.user,
	// 			page: 'courts'
	// 		});
	// 	}
	// });
});

// CREATE - Add new court to DB
router.post('/', middleware.isLoggedIn, function (req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || !data.length) {
			req.flash('error', 'Invalid address');
			console.log(err);

			return res.redirect('back');
		}
		var lat = data[0].latitude;
		var lng = data[0].longitude;
		var location = data[0].formattedAddress;
		var newCourt = {
			name: name,
			image: image,
			description: description,
			price: price,
			author: author,
			location: location,
			lat: lat,
			lng: lng
		};
		//create new court save to db
		Court.create(newCourt, function (err, newlyCreated) {
			if (err) {
				console.log(err);
			}
			else {
				//redirect back to show all page
				res.redirect('/courts/' + newlyCreated._id);
			}
		});
	});
});

// NEW - Display new court form
router.get('/new', middleware.isLoggedIn, function (req, res) {
	res.render('courts/new');
});

// SHOW - Show more info about one court
router.get('/:id', function (req, res) {
	//find court with provided id
	Court.findById(req.params.id).populate('comments').exec(function (err, foundCourt) {
		if (err) {
			console.log(err);
		}
		else {
			// check if foundCourt exists
			if (!foundCourt) {
				req.flash('error', 'Page not found.');
				return res.redirect('back');
			}

			//render show template with that court
			res.render('courts/show', { court: foundCourt });
		}
	});
});

// EDIT Court Route
router.get('/:id/edit', middleware.checkCourtOwnership, function (req, res) {
	Court.findById(req.params.id, function (err, foundCourt) {
		// check if foundCourt exists
		if (!foundCourt) {
			req.flash('error', 'Page not found.');
			return res.redirect('back');
		}
		res.render('courts/edit', { court: foundCourt });
	});
});

// UPDATE Court Route
router.put('/:id', middleware.checkCourtOwnership, function (req, res) {
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || !data.length) {
			req.flash('error', 'Invalid address');
			console.log(err);

			return res.redirect('back');
		}
		req.body.court.lat = data[0].latitude;
		req.body.court.lng = data[0].longitude;
		req.body.court.location = data[0].formattedAddress;

		// find and update correct court
		Court.findByIdAndUpdate(req.params.id, req.body.court, function (err, updatedCourt) {
			if (err) {
				req.flash('error', err.message);
				res.redirect('back');
			}
			else {
				req.flash('success', 'Successfully updated!');
				res.redirect('/courts/' + req.params.id);
			}
		});
	});
});

// DESTROY Court Route
// router.delete('/:id', function (req, res) {
// 	Court.findByIdAndRemove(req.params.id, function (err) {
// 		if (err) {
// 			res.redirect('/courts');
// 		}
// 		else {
// 			res.redirect('/courts');
// 		}
// 	});
// });
router.delete('/:id', middleware.checkCourtOwnership, async (req, res) => {
	try {
		let foundCourt = await Court.findById(req.params.id);
		await foundCourt.remove();
		req.flash('success', 'Court Deleted!');
		res.redirect('/courts');
	} catch (error) {
		console.log(error.message);
		res.redirect('/courts');
	}
});

function escapeRegex (text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = router;
