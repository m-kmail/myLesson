const express = require("express");
const router = express.Router();
const urllib = require("urllib");
const allTeachers = require("../../modules/Teacher");
const allStudents = require("../../modules/Student");
const allCourses = require("../../modules/Course");

router.get("/user/:userEmail", function (request, response) {
  userEmailParameter = request.params.userEmail;
  if (userEmailParameter.includes("@student.com")) {
    allStudents
      .findOne({ email: userEmailParameter })
      .exec(function (err, user) {
        if (!user) response.send(undefined);
        else response.send(user);
      });
  } else if (userEmailParameter.includes("@teacher.com")) {
    allTeachers
      .findOne({ email: userEmailParameter })
      .exec(function (err, user) {
        if (!user) response.send(undefined);
        else response.send(user);
      });
  } else response.send(undefined);
});

router.post("/addUser", function (request, response) {
  const userInfo = request.body;
  if (userInfo.email.includes("@student.com")) {
    allStudents.findOne({ email: userInfo.email }).exec(function (err, user) {
      if (user == null) {
        const newUser = new allStudents({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
          courses: [],
        });
        newUser.save();
        response.end();
      } else response.send("email already exists");
    });
  } else if (userInfo.email.includes("@teacher.com")) {
    allTeachers.findOne({ email: userInfo.email }).exec(function (err, user) {
      if (user == null) {
        const newUser = new allTeachers({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
          courses: userInfo.courses,
          students: userInfo.students,
        });
        newUser.save();

        response.end();
      } else response.send("email already exists");
    });
  } else response.send("invalid email");
});

router.get("/courses/:studentEmail", function (request, response) {
  const studentEmail = request.params.studentEmail;
  allStudents.findOne({ email: studentEmail }).exec(function (err, student) {
    response.send(student.courses);
  });
});

module.exports = router;
