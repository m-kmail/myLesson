const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Student = require("./Student.js");
const Teacher = require("./Teacher.js");

const courseSchema = new Schema({
  name: String,
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher" },
  startTime: Number,
  available: Boolean,
});
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
