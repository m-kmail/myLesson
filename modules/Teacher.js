const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = require("./Course.js");
const Student = require("./Student.js");

const teacherSchema = new Schema({
  name: String,
  email: String,
  password: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
