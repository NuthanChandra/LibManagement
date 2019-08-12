var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var app = express();
app.use(express.static(__dirname + '/public'));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

var book = {isbn: 1234, bname: "OS", edition: 8, author: "Padma Reddy"};
var student = [{regno: "13P1", sname: "Nuthan", branch: "CS", sem: 5, contact: 9066670290, address:"Kanakanagara, Hoskote"}];
var stu_book = [];

app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.render('home');
});

app.post('/',function(req,res){
    var stu_obj = {sname: req.body.s.name, bname: req.body.s.book,
      issue_date: req.body.s.issue_date, return_date: req.body.s.return_date };
    stu_book.push(stu_obj);
    console.log(stu_book);
    res.redirect("/");
});

app.listen(8000,function(){
    console.log("App listening on port 8000");
});
