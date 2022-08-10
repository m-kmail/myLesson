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

router.put("/courses", function (request, response) {
  const courseToAdd = request.body.courseId;
  const userEmail = request.body.userEmail;
  allStudents.findOne({ email: userEmail }).exec(function (err, student) {
    allCourses.findOne({ _id: courseToAdd }).exec(function (err, course) {
      student.courses.push(course);
      student.save();
      response.end();
    });
  });
});

router.get("/courses", function (request, response) {
  const courseName = request.query.courseName;
  if (courseName == undefined) {
    allCourses.find({}).exec(function (err, coursesResult) {
      response.send(coursesResult);
    });
  } else {
    allCourses.find({ name: courseName }).exec(function (err, coursesResult) {
      response.send(coursesResult);
    });
  }
});
router.delete("/courses/:userEmail/:courseId", function (request, response) {
  const userEmail = request.params.userEmail;
  const courseId = request.params.courseId;
  if (userEmail.includes("@student.com")) {
    let index = 0;
    allStudents
      .findOne({ email: userEmail })
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
  }
  if (userEmail.includes("@teacher.com")) {
    let index = 0;
    allTeachers
      .findOne({ email: userEmail })
      .populate("courses")
      .exec(function (err, teacher) {
        teacher.courses.forEach((c) => {
          if (courseId == c._id) {
            teacher.courses.splice(index, 1);
            teacher.save();
          }
          index++;
        });
        response.send(teacher.courses);
      });
  }
});

router.get("/courses/:userEmail", function (request, response) {
  const userEmail = request.params.userEmail;
  if (userEmail.includes("@student.com")) {
    allStudents
      .findOne({ email: userEmail })
      .populate("courses")
      .exec(function (err, student) {
        let coursesToStudent = [];
        if (student) {
          student.courses.forEach((course) => {
            let newObj = {
              id: course._id,
              name: course.name,
              startTime: course.startTime,
              available: course.available,
            };
            coursesToStudent.push(newObj);
          });
        }
        response.send(coursesToStudent);
      });
  }
  if (userEmail.includes("@teacher.com")) {
    allTeachers
      .findOne({ email: userEmail })
      .populate("courses")
      .exec(function (err, teacher) {
        let coursesToTeacher = [];
        if (teacher) {
          teacher.courses.forEach((course) => {
            let newObj = {
              id: course._id,
              name: course.name,
              startTime: course.startTime,
              available: course.available,
            };
            coursesToTeacher.push(newObj);
          });
        }
        response.send(coursesToTeacher);
      });
  }
});

router.post("/courses/:teacherEmail", function (request, response) {
  const teacherEmail = request.params.teacherEmail;
  const courseBody = request.body;
  let newCourse = new allCourses({
    name: courseBody.name,
    startTime: courseBody.startTime,
    available: true,
  });
  newCourse.save();
  allTeachers.findOne({ email: teacherEmail }).exec(function (error, teacher) {
    teacher.courses.push(newCourse);
    teacher.save();
  });
  response.end();
});

module.exports = router;
