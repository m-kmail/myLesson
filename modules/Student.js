const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = require("./Course.js");
const studentSchema = new Schema({
  name: String,
  email: String,
  password: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
