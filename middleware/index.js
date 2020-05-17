var Court = require('../models/court');
var Comment = require('../models/comment');

// All middleware goes here
var middlewareObj = {};

middlewareObj.checkCourtOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Court.findById(req.params.id, function (err, foundCourt) {
			if (err) {
				req.flash('error', 'Court Not Found');
				res.redirect('back');
			}
			else {
				// check if foundCourt exists
				if (!foundCourt) {
					req.flash('error', 'Item no found.');
					return res.redirect('back');
				}

				// does user own the court?
				if (foundCourt.author.id.equals(req.user._id)) {
					next();
				}
				else {
					req.flash('error', "You Don't Have Permission To Do That");
					res.redirect('back');
				}
			}
		});
	}
	else {
		req.flash('error', 'Please Login First!');
		res.redirect('back');
	}
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err) {
				res.redirect('back');
			}
			else {
				// check if foundComment exists
				if (!foundComment) {
					req.flash('error', 'Page not found.');
					return res.redirect('back');
				}

				// does user own the comment?
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				}
				else {
					req.flash('error', "You Don't Have Permission To Do That");
					res.redirect('back');
				}
			}
		});
	}
	else {
		req.flash('error', 'Please Login First!');
		res.redirect('back');
	}
};

middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.session.returnTo = req.originalUrl;
	//add to flash
	req.flash('error', 'Please Login First!');
	res.redirect('/login');
};

module.exports = middlewareObj;
