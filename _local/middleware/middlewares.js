module.exports = function(app){

    var express = require('express');
    var bodyParser = require('body-parser');
    var path = require('path');
    var mongoose = require('mongoose');
    var routes = require('../routes/api');

    //database connection
    mongoose.connect('mongodb://localhost/book_keeper');

    //middleware setup
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
        limit : '50mb'
    }));

    //setup routes
    app.use('/api', routes);

    //make use of the following folders as static files
    app.use('/',  express.static(__dirname + '/'));
    app.use('/app',  express.static(path.join(__dirname + '/../../', 'app')));
    app.use('/uploads',  express.static(path.join(__dirname + '/../', 'uploads')));

};