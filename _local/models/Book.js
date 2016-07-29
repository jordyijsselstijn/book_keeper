//dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//schema
var schema = mongoose.Schema,
	ObjectId = schema.ObjectId;
var bookSchema = new schema({
	id : ObjectId,
	title : String,
	ISBN : String,
	date_added : {type: Date, default: Date.now()},
	genre : String,
	writer : String,
	coverText : String,
	coverImage : String,
	read : Boolean
});

//return model
module.exports = restful.model('Books', bookSchema);