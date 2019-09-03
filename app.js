const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const connectDb = require("./src/connection");
// mongoose.connect("mongodb://mongo:27017");
const Student = require("./models/student");
const app = express();

// Connect to mongodb
mongoose.connect('mongodb://mongo:27017/express_test',{ useNewUrlParser: true})
.then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.use(express.static(__dirname + '/public'));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.render('home');
});

app.post('/',function(req,res){
    const stu_obj = {studentName: req.body.s.name, bookName: req.body.s.book,
      issueDate: req.body.s.issue_date, returnDate: req.body.s.return_date };
    console.log("Student obj name is "+ stu_obj.sname);
    Student.create(stu_obj,function(err,new_stud){
      if(err || !new_stud){
        console.log("Error in writing to database");
      }
      else{
        console.log("Written to db");
        console.log(new_stud);
      }
    })

    res.redirect("/");
});

app.listen(8000,function(){
    console.log("App listening on port 8000");
});
