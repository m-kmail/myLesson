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
    // $.post("/addUser", newUser, function (result) {});
    $.ajax({
      method: "POST",
      url: "/addUser",
      data: newUser,
      success: (result) => {
        ErrorDiv.empty();
        ErrorDiv.show();
        ErrorDiv.append(`<p style="color:green">Done...go to login</p>`);
      },
      error: (result) => {
        console.log(result);
        ErrorDiv.empty();
        ErrorDiv.show();
        ErrorDiv.append(`<p>${result.responseJSON.Error}</p>`);
      },
    });
  }

  login(email, pass) {
    $.ajax({
      method: "GET",
      url: `/user/${email}`,
      success: (user) => {
        {
          console.log(user);

          if (user.password != pass) {
            this.ErrorDiv.empty();
            this.ErrorDiv.show();
            this.ErrorDiv.append(`<p>Invalid Password</p>`);
          } else {
            let thisUser = {
              email: email,
              name: user.name,
            };

            thisUser = JSON.stringify(thisUser);
            localStorage.setItem("userInfo", thisUser);
            this.ErrorDiv.empty();
            if (email.includes("@student.com"))
              window.location.href = "./student.html";
            else window.location.href = "./teacher.html";
          }
        }
      },
      error: (err) => {
        console.log(err);
        console.log("not exist");
        this.ErrorDiv.empty();
        this.ErrorDiv.show();
        this.ErrorDiv.append(`<p>Invalid Email</p>`);
      },
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

  createNewCourse(userEmail, courseName, startTime) {
    let p = $.ajax({
      method: "POST",
      url: `/courses/${userEmail}`,
      data: { startTime: startTime, name: courseName },
      success: function () {},
    });
    return p;
  }

  gitStudents(courseId) {
    let p = $.ajax({
      method: "GET",
      url: `/students/${courseId}`,
      success: function () {},
    });
    return p;
  }

  getCourses() {
    return { courses: this.courses, name: this.name };
  }
}
