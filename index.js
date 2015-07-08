var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('underscore');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded( {extended: true} )); 

var users = [
	{
		id: 1,
		username: 'bob',
		firstname: 'Bob', 
		lastname: 'Jones',
		age: 35
	},
	{	
		id: 2,
		username: 'dan',
		firstname: 'Dan', 
		lastname: 'Prescott',
		age: 24
	}
];

app.get('/users', function (req, res) {
	res.json(users);
});

app.post('/users', function (req, res) {
    var newUser = req.body;
    users.push(newUser); 
    res.json(users);
});

app.put('/users/:id', function (req, res) {
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId});

	foundUser.username = req.body.username;
	foundUser.firstname = req.body.firstname;
	foundUser.lastname = req.body.lastname;
	foundUser.age = req.body.age;

	res.json(users);

});

app.delete('/users/:id', function (req, res) {
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId});

	if(foundUser) {
		users.splice(users.indexOf(foundUser), 1);
	}

	res.json(users);

});

app.get('/users/:id', function (req, res) {
	var foundUser = _.findWhere(users, {id: parseInt(req.params.id)});
	res.json(foundUser);
});

app.get('/', function (req, res) {

});

app.listen(3000);