var mongoose = require('mongoose');

var courtSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	location: String,
	lat: Number,
	lng: Number,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

var Comment = require('./comment');
courtSchema.pre('remove', async function () {
	await Comment.deleteMany({
		_id: {
			$in: this.comments
		}
	});
});

module.exports = mongoose.model('Court', courtSchema);
