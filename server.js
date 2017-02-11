var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res){
	res.send('Todo API Root');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	// var todoId = req.params.id;
	var matchedTodo;
	todos.forEach( function(todo) {
		if (todoId === todo.id){
			matchedTodo = todo;
		}		
	});
	//res.send('Asking for todo with id of ' + req.params.id);
	if (matchedTodo != undefined){
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}	
});

app.post('/todos', function (req, res){
	// var body = req.body;
	// console.log('description: ' + body.description);
	// res.json(body);
    var tempTodo = {
    	"description": req.body.description,
    	"completed": req.body.completed,
    	"id": todoNextId
    };
	todos.push(tempTodo);
	todoNextId += 1;
	res.json('todo added. now the app has ' + (todoNextId - 1) + ' todos!');
});

// POST /todos

app.listen(PORT, function(){
	console.log('Express listening to port ' + PORT + '!');
});