var express = require('express');
var router = express.Router({ mergeParams: true });
var Court = require('../models/court');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// Comments new
router.get('/new', middleware.isLoggedIn, function (req, res) {
	Court.findById(req.params.id, function (err, court) {
		if (err) {
			console.log(err);
		}
		else {
			// check if foundCourt exists
			if (!court) {
				req.flash('error', 'Page not found.');
				return res.redirect('back');
			}
			res.render('comments/new', { court: court });
		}
	});
});

// Comments create
router.post('/', middleware.isLoggedIn, function (req, res) {
	Court.findById(req.params.id, function (err, court) {
		if (err) {
			console.log(err);
			res.redirect('/courts');
		}
		else {
			// check if foundCourt exists
			if (!court) {
				req.flash('error', 'Page not found.');
				return res.redirect('back');
			}

			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					req.flash('error', 'Something Went Wrong');
					console.log(err);
				}
				else {
					// check if foundCourt exists
					if (!comment) {
						req.flash('error', 'Page not found.');
						return res.redirect('back');
					}

					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					court.comments.push(comment);
					court.save();
					req.flash('success', 'Successfully Added New Comment!');
					res.redirect('/courts/' + court._id);
				}
			});
		}
	});
});

// Comments Edit
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function (req, res) {
	Comment.findById(req.params.comment_id, function (err, foundComment) {
		if (err) {
			res.redirect('back');
		}
		else {
			// check if foundCourt exists
			if (!foundComment) {
				req.flash('error', 'Page not found.');
				return res.redirect('back');
			}
			res.render('comments/edit', { court_id: req.params.id, comment: foundComment });
		}
	});
});

// Comments Update
router.put('/:comment_id', middleware.checkCommentOwnership, function (req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			res.redirect('back');
		}
		else {
			// check if foundCourt exists
			if (!updatedComment) {
				req.flash('error', 'Page not found.');
				return res.redirect('back');
			}
			res.redirect('/courts/' + req.params.id);
		}
	});
});

// Comment Destroy
router.delete('/:comment_id', middleware.checkCommentOwnership, function (req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function (err) {
		if (err) {
			res.redirect('back');
		}
		else {
			req.flash('success', 'Comment Deleted!');
			res.redirect('/courts/' + req.params.id);
		}
	});
});

module.exports = router;
