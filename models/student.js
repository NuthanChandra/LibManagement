var mongoose= require("mongoose");
var studentSchema= new mongoose.Schema({
   sutdentName: String,
   bookName: String,
   issueDate: Date,
   return_date: Date
});
module.exports = mongoose.model("Student",studentSchema);
