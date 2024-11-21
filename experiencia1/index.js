var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host :'localhost',
    database : 'barbershop',
    port : 3306,
    user: 'root',
    password: '',
});

connection.connect(function(err){
    if (err) throw err;
    console.log('Se conecto a la BD');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

var server = app.listen(3000, "127.0.0.1",function(){
    var host = server.address().address;
    var port = server.address().port;
});

app.get('/books',function(req,res){
    connection.query('select * from books' , function(error,results){
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.get('/books/:id', function(req,res){
    connection.query('select * from books where id = ?', [req.params.id], function(error,results){
        if (error) throw error;
        res.end(JSON.stringify(results))
        });
});