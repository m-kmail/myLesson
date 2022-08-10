class Model {
  constructor() {
    this.courses = [];
    this.name = "";
    this.ErrorDiv = $(".Error");
  }

  getCourseByName(courseName) {
    let p;
    if (courseName) {
      console.log(courseName);
      p = $.get(`/courses?courseName=${courseName}`, function (courses) {});
    } else p = $.get(`/courses`, function (courses) {});
    return p;
  }

  getCoursesFromDB(userEmail) {
    let coursesFromDB = $.get(`/courses/${userEmail}`, function (courses) {
      this.courses = [];
      this.courses = courses;
    });

    return Promise.resolve(coursesFromDB).then(() => {
      return coursesFromDB;
    });
  }

  createUser(newUser) {
    $.post("/addUser", newUser, function (result) {
      if (result == "") {
        ErrorDiv.empty();
      } else {
        ErrorDiv.empty();
        ErrorDiv.show();
        ErrorDiv.append(`<p>${result}</p>`);
        regEmailField.val("");
        regName.val("");
        regPass.val("");
      }
    });
  }

  login(email, pass) {
    $.get(`/user/${email}`, (user) => {
      if (!user) {
        this.ErrorDiv.empty();
        this.ErrorDiv.show();
        this.ErrorDiv.append(`<p>Invalid Email</p>`);
      } else {
        if (user.password != pass) {
          this.ErrorDiv.empty();
          this.ErrorDiv.show();
          this.ErrorDiv.append(`<p>Invalid Password</p>`);
        } else {
          let thisUser = {
            email: email,
          };
          thisUser = JSON.stringify(thisUser);
          localStorage.setItem("userInfo", thisUser);
          this.ErrorDiv.empty();
          if (email.includes("@student.com"))
            window.location.href = "./student.html";
          else window.location.href = "./teacher.html";
        }
      }
    });
  }

  addCourse(courseId, userEmail) {
    let p = $.ajax({
      method: "PUT",
      url: "/courses",
      data: {
        courseId: courseId,
        userEmail: userEmail,
      },
      success: function () {},
    });
    return p;
  }

  removeCourse(userEmail, courseId) {
    let p = $.ajax({
      method: "Delete",
      url: `/courses/${userEmail}/${courseId}`,
      success: function (d) {
        for (let i in this.courses) {
          if (this.courses[i].id == courseId) {
            this.courses.splice(i, 1);
            break;
          }
        }
      },
    });

    return p;
  }

  getCourses() {
    return { courses: this.courses, name: this.name };
  }
}
