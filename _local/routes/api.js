//express dependencies
var express = require('express');
var router = express.Router();
var request = require('request');
//image resizing libs
var sharp = require('sharp');
var async = require('async');

//file system libs
var multer = require('multer');
var fs = require('fs');


//file system setup
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './uploads');


  },
  filename: function (req, file, cb) {


    var extensionArr = file.originalname.split('.');
    var extension = '.' + extensionArr[extensionArr.length-1];
    var fileName = file.fieldname + '-' + Date.now()+ extension;
    cb(null, fileName);

  }
});
var upload = multer({ storage: storage });

//models
var Book = require('../models/Book');
var Collection = require('../models/Collection');
var BookCollection = require('../models/Book_Collection');

//routing models directly
Book.methods(['get', 'put']);
Book.register(router, '/books');


Collection.methods(['get', 'post', 'put', 'delete']);
Collection.register(router, '/collections');

BookCollection.methods(['get', 'post', 'delete']);
BookCollection.register(router, '/book-collections');

//routes

//Add by ISBN only
router.post('/books/isbn' ,function(req, res, next){

  function bindIfDefined (obj, key, value) {

    if(key in obj){
      console.log(obj);
      return value;
    }else{
      return 'UNKNOWN'
    }
  }

  var isbn = req.body.isbn;
  var requestUri = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn;
  var proxy = {
    title : String,
    ISBN : String,
    genre : String,
    writer : String,
    coverText : String,
    coverImage : String,
    read : Boolean
  };
  request({
    url: requestUri,
    json: true
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {

      var bookFromRequest = body.items[0].volumeInfo;
      proxy.ISBN = isbn;
      proxy.read = false;

      if('title' in bookFromRequest){
        proxy.title = bookFromRequest.title;
      }else{
        proxy.title = 'UNKNOWN';
      }

      if('authors' in bookFromRequest){
        proxy.writer = bookFromRequest.authors[0];
      }else{
        proxy.writer = 'UNKNOWN';
      }

      if('description' in bookFromRequest){
        proxy.coverText = bookFromRequest.description;
      }else{
        proxy.coverText = 'UNKNOWN';
      }

      if('subtitle' in bookFromRequest){
        proxy.genre = bookFromRequest.subtitle;
      }else{
        proxy.genre = 'UNKNOWN';
      }

      if('imageLinks' in bookFromRequest){
        proxy.coverImage = bookFromRequest.imageLinks.thumbnail;
      }else{
        proxy.coverImage = 'UNKNOWN';
      }

      var _book = new Book(proxy);

      _book.save();

    }
  })
});
router.delete('/books/:id', function(req,res){

  //Makes sure book and coverimage are removed from server.
  var id = req.params.id;
  console.log(id);

  Book.findOne({ _id:id }, function(err, docs){

    if(docs.coverImage !=  "UNKNOWN"){
      if(docs.coverImage.split('/')[0] != 'http:'){
        fs.unlink( docs.coverImage , function(err){
          if (err) throw err;
          console.log('deleted ' + docs.coverImage );
        });
      }
      Book.findOne({_id: id}).remove(function(e){
        res.sendStatus(204);
      });

    }else{
      Book.findOne({_id: id}).remove(function(e){
        res.sendStatus(204);
      });
    }

  });
  Collection.find({books : id}, function(err, docs){
    if(docs.length > 1){

    }else{
      var index = docs.indexOf(id);
      if (index > -1) {
        docs.splice(index, 1);
      }
    }
  })


});


//upload completely new book
router.post('/books', upload.single('image'), function(req, res, next) {

  var book = req.body;
  var origPath = req.file.path;
  var imageArr = req.file.path.split('.');
  imageArr.splice(imageArr.length-1, 0, '.resized.');

  var stringFromArr = imageArr.join().replace(",", "").replace(",", "");

  book.coverImage = stringFromArr;
  var _book = new Book(book);

  res.end("File is uploaded");

  _book.save();


  //resizes the image from the request and deletes the original one.
  sharp( origPath )
  .resize(200)
  .toFile(stringFromArr,
    function(err){
      if(err) console.log(err);
      fs.unlink( origPath , function(err){
        if (err) throw err;
        console.log('deleted ' + origPath );
      });
    });

  });

  module.exports = router;
