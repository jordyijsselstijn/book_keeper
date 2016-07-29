//dependencies
var restful = require('node-restful');
var book = require('./Book');
var mongoose = restful.mongoose;

//schema
var schema = mongoose.Schema,
    ObjectId = schema.ObjectId;
var collectionSchema = new mongoose.Schema({
    id : ObjectId,
    name : String,
    books : [mongoose.Schema.Types.ObjectId]
});


//return model
module.exports = restful.model('Collections', collectionSchema);