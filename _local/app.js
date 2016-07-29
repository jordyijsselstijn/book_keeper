//app
var express = require('express');
var app = express();

//middleware
var exec = require('exec');
var path = require('path');

require('./middleware/middlewares')(app);

//default route for all the angular.js stuff
app.get('/' , function(req, res){
	res.sendFile(path.join(__dirname, '../', 'index.html'));
});

//start server
app.listen(3000, function(){
	console.log('app is listening on port 3000');
});

//Run gulp on start.
exec('gulp', function (err, out, code) {

	if (err instanceof Error)
		throw err;
	process.stderr.write(err);
	process.stdout.write(out);

});