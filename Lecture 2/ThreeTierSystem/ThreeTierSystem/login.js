///
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var port = 3000

var app = express();

//Using the css file
app.use(express.static(__dirname));

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'nodelogin'
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//login page
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/index.html'));
});

//for the authentication
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;

    console.log(password+'  '+username)

	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE name = ? AND password = ?', [username, password], function(error, results, fields) {

            console.log(results)

			if (results.length > 0) {

				response.redirect('/');
			} else {
				response.send('Incorrect username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter username and Password!');
		response.end();
	}
});

//Home page route
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
})




//Set our app to listen at our port
app.listen(port, function () {
    console.log('We are listening on port ' + port)
})
