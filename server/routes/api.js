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

router.get("/courses/:studentEmail", function (request, response) {
  const studentEmail = request.params.studentEmail;
  allStudents
    .findOne({ email: studentEmail })
    .populate("courses")
    .exec(function (err, students) {
      response.send(students.courses);
    });
});

router.delete("/courses/:studentEmail/:courseId", function (request, response) {
  const studentEmail = request.params.studentEmail;
  const courseId = request.params.courseId;
  let index = 0;
  allStudents
    .findOne({ email: studentEmail })
    .populate("courses")
    .exec(function (err, student) {
      student.courses.forEach((c) => {
        if (courseId == c._id) {
          student.courses.splice(index, 1);
          student.save();
        }
        index++;
      });
      response.send(student.courses);
    });
});

router.put("/courses", function (request, response) {
  const courseToAdd = request.body.courseId;
  const studentEmail = request.body.studentEmail;
  allStudents.findOne({ email: studentEmail }).exec(function (err, student) {
    allCourses.findOne({ _id: courseToAdd }).exec(function (err, course) {
      student.courses.push(course);
      student.save();
      response.end();
    });
  });
});

// router.get("/tests", function (request, response) {
//   const s1 = new allStudents({
//     name: "s1",
//     email: "s1@student.com",
//     pass: "aa",
//     courses: [],
//   });
//   const s2 = new allStudents({
//     name: "s2",
//     email: "s2@student.com",
//     pass: "aa",
//     courses: [],
//   });
//   const s3 = new allStudents({
//     name: "s3",
//     email: "s3@student.com",
//     pass: "aa",
//     courses: [],
//   });
//   const s4 = new allStudents({
//     name: "s4",
//     email: "s4@student.com",
//     pass: "aa",
//     courses: [],
//   });
//   const s5 = new allStudents({
//     name: "s5",
//     email: "s5@student.com",
//     pass: "aa",
//     courses: [],
//   });
//   const c1 = new allCourses({
//     name: "arabic",
//     startTime: 1,
//     available: true,
//   });
//   const c2 = new allCourses({
//     name: "english",
//     startTime: 2,
//     available: true,
//   });
//   const c3 = new allCourses({
//     name: "french",
//     startTime: 2,
//     available: true,
//   });
//   s1.courses.push(c1);
//   s2.courses.push(c1);
//   s3.courses.push(c1);
//   s3.courses.push(c2);
//   c1.save();
//   c2.save();
//   c3.save();
//   s1.save();
//   s2.save();
//   s3.save();
//   s4.save();
//   s5.save();
//   response.send(allStudents.find({}));
// });

module.exports = router;
