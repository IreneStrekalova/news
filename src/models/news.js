const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	tags: {
		type: [String]
	},
	date: {
		type: Date
	},
	updateDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('New', schema);