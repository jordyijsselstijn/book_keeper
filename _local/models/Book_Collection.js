//dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

//schema
var schema = mongoose.Schema,
    ObjectId = schema.ObjectId;

var bookCollectionSchema = schema({
    id : ObjectId,
    book_id : String,
    collection_id : String
});

//return model
module.exports = restful.model('Book_Collection', bookCollectionSchema);


