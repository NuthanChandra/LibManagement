var mongoose= require("mongoose");
var studentSchema= new mongoose.Schema({
   studentName: String,
   bookName: String,
   issueDate: Date,
   returnDate: Date
});
module.exports = mongoose.model("Student",studentSchema);
