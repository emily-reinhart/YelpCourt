var mongoose = require('mongoose');
var Court = require('./models/court');
var Comment = require('./models/comment');

var data = [
	{
		name: "Cloud's Rest",
		image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
		description:
			'Suspendisse potenti. Vivamus semper, sem in porttitor gravida, risus diam lacinia tortor, vel finibus erat metus ac sem. Sed ac placerat nunc. Cras ac orci mauris. Suspendisse facilisis commodo est, ut posuere dui viverra vitae. Morbi a pretium nulla, non pharetra lacus. Aliquam a dictum justo. Proin feugiat, urna eu consectetur imperdiet, velit justo pharetra felis, a aliquet risus massa in tellus. Donec venenatis lacinia nunc vel laoreet. Quisque sed sodales felis. In nec felis sollicitudin, viverra tortor id, sagittis nibh. Sed venenatis lacinia diam, eget porta velit porta vel. Duis facilisis ligula sed metus volutpat hendrerit at et metus. Vivamus rhoncus quam sit amet ex congue vehicula. Aliquam at justo a leo finibus dapibus at sed lacus. Duis massa mauris, porttitor eu arcu pellentesque, gravida placerat justo.'
	},
	{
		name: 'Desert Mesa',
		image: 'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
		description:
			'Suspendisse potenti. Vivamus semper, sem in porttitor gravida, risus diam lacinia tortor, vel finibus erat metus ac sem. Sed ac placerat nunc. Cras ac orci mauris. Suspendisse facilisis commodo est, ut posuere dui viverra vitae. Morbi a pretium nulla, non pharetra lacus. Aliquam a dictum justo. Proin feugiat, urna eu consectetur imperdiet, velit justo pharetra felis, a aliquet risus massa in tellus. Donec venenatis lacinia nunc vel laoreet. Quisque sed sodales felis. In nec felis sollicitudin, viverra tortor id, sagittis nibh. Sed venenatis lacinia diam, eget porta velit porta vel. Duis facilisis ligula sed metus volutpat hendrerit at et metus. Vivamus rhoncus quam sit amet ex congue vehicula. Aliquam at justo a leo finibus dapibus at sed lacus. Duis massa mauris, porttitor eu arcu pellentesque, gravida placerat justo.'
	},
	{
		name: 'Canyon Floor',
		image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
		description:
			'Suspendisse potenti. Vivamus semper, sem in porttitor gravida, risus diam lacinia tortor, vel finibus erat metus ac sem. Sed ac placerat nunc. Cras ac orci mauris. Suspendisse facilisis commodo est, ut posuere dui viverra vitae. Morbi a pretium nulla, non pharetra lacus. Aliquam a dictum justo. Proin feugiat, urna eu consectetur imperdiet, velit justo pharetra felis, a aliquet risus massa in tellus. Donec venenatis lacinia nunc vel laoreet. Quisque sed sodales felis. In nec felis sollicitudin, viverra tortor id, sagittis nibh. Sed venenatis lacinia diam, eget porta velit porta vel. Duis facilisis ligula sed metus volutpat hendrerit at et metus. Vivamus rhoncus quam sit amet ex congue vehicula. Aliquam at justo a leo finibus dapibus at sed lacus. Duis massa mauris, porttitor eu arcu pellentesque, gravida placerat justo.'
	}
];

function seedDB () {
	//Remove all courts
	Court.deleteMany({}, function (err) {
		// if (err) {
		// 	console.log(err);
		// }
		// console.log('removed courts!');
		// Comment.deleteMany({}, function (err) {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	console.log('removed comments!');
		// 	//add a few courts
		// 	data.forEach(function (seed) {
		// 		Court.create(seed, function (err, court) {
		// 			if (err) {
		// 				console.log(err);
		// 			}
		// 			else {
		// 				console.log('added a court');
		// 				//create a comment
		// 				Comment.create(
		// 					{
		// 						text: 'This place is great, but I wish there was internet',
		// 						author: 'Homer'
		// 					},
		// 					function (err, comment) {
		// 						if (err) {
		// 							console.log(err);
		// 						}
		// 						else {
		// 							court.comments.push(comment);
		// 							court.save();
		// 							console.log('Created new comment');
		// 						}
		// 					}
		// 				);
		// 			}
		// 		});
		// 	});
		// });
	});
	//add a few comments
}

module.exports = seedDB;
