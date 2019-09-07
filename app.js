const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const connectDb = require("./src/connection");
// mongoose.connect("mongodb://mongo:27017");
const Student = require("./models/student");
const app = express();

// Connect to mongodb
const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect("mongodb://mongodb:27017/test", options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}
connectWithRetry()



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
