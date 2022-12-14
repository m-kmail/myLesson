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
        if (!user) {
          response.status(404).send({
            Error:
              "The email address you entered isn't connected to an account",
          });
        } else response.send(user);
      });
  } else if (userEmailParameter.includes("@teacher.com")) {
    allTeachers
      .findOne({ email: userEmailParameter })
      .exec(function (err, user) {
        if (!user) {
          response.status(404).send({
            Error:
              "The email address you entered isn't connected to an account",
          });
        } else response.send(user);
      });
  } else {
    response.status(404).send({
      Error: "The email address you entered isn't connected to an account",
    });
  }
});

router.get("/students/:courseId", function (request, response) {
  courseId = request.params.courseId;
  let studentsCourse = [];
  allStudents.find({}).exec(function (err, students) {
    students.forEach((student) => {
      student.courses.forEach((course) => {
        if (course == courseId) studentsCourse.push(student);
      });
    });
    response.send(studentsCourse);
  });
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
      } else {
        response.status(409).send({
          Error: "The email address you entered is already existed",
        });
      }
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
      course.length++;
      student.courses.push(course);
      course.save();
      student.save();
      response.end();
    });
  });
});

router.get("/courses", function (request, response) {
  const courseName = request.query.courseName;
  if (courseName == undefined) {
    allCourses
      .find({})
      .populate("teacher")
      .exec(function (err, coursesResult) {
        response.send(coursesResult);
      });
  } else {
    allCourses.find({ name: courseName }).exec(function (err, coursesResult) {
      response.send(coursesResult);
    });
  }
});
router.delete("/courses/:userEmail/:courseId", function (request, response) {
  const courseId = request.params.courseId;
  allCourses.findOne({ _id: courseId }).exec(function (err, course) {
    course.length--;
    course.save();
  });
  const userEmail = request.params.userEmail;
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
        allCourses.findByIdAndDelete({ _id: courseId }, function (err, course) {
          console.log(course);
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
      .populate({
        path: "courses",
        populate: {
          path: "teacher",
        },
      })
      .exec(function (err, student) {
        let coursesToStudent = [];
        if (student) {
          student.courses.forEach((course) => {
            let newObj = {
              id: course._id,
              name: course.name,
              startTime: course.startTime,
              available: course.available,
              length: course.length,
              teacher: course.teacher.name,
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
              length: course.length,
            };
            coursesToTeacher.push(newObj);
          });
        }
        response.send(coursesToTeacher);
      });
  }
});

router.post("/courses/:teacherEmail", async function (request, response) {
  const teacherEmail = request.params.teacherEmail;

  const courseBody = request.body;
  allTeachers.findOne({ email: teacherEmail }).exec(function (err, t) {
    let newCourse = new allCourses({
      name: courseBody.name,
      startTime: courseBody.startTime,
      available: true,
      length: 0,
      teacher: t,
    });

    let ok = true;
    let p = allTeachers
      .findOne({ email: teacherEmail })
      .populate("courses")
      .exec(function (error, teacher) {
        teacher.courses.forEach((course) => {
          if (course.startTime == newCourse.startTime) {
            ok = false;
          }
        });
        if (ok) {
          teacher.courses.push(newCourse);
          teacher.save();
          newCourse.save();
        }
      });

    response.end();
  });
});

module.exports = router;
