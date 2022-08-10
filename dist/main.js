//const render = new Renderer();
const model = new Model();
const renderer = new Renderer();
const courseName = $("#searchCourse");
const searchContainer = $(".searchedCourses");

const logEmailField = $("#login").find(".email");
const logPassField = $("#login").find(".pass");
const ErrorDiv = $(".Error");

const regEmailField = $("#register").find(".email");
const regName = $("#register").find(".name");
const regPass = $("#register").find(".pass");

const tologin = function () {
  $("#register").hide();
  $("#login").show();
};
const toreg = function () {
  $("#login").hide();
  $("#register").show();
};

const validEmail = function (email) {
  let x;
  if (email.includes("@student.com")) x = email.indexOf("@student.com") + 12;
  else if (email.includes("@teacher.com"))
    x = email.indexOf("@teacher.com") + 12;
  else return false;

  if (x < email.length) {
    return false;
  }
  email = email.slice(0, x - 12);
  if (email.includes(".") || email.includes("@")) {
    return false;
  }
  return true;
};

const getAvailableCourses = function () {
  const searchName = courseName.val();
  let x = model.getCourseByName(searchName);
  x.then(function (d) {
    let coursesFromSearch = [];
    for (let c of d) {
      const newCorse = {
        name: c.name,
        startTime: c.startTime,
        available: c.available,
        id: c._id,
        minus: false,
      };
      coursesFromSearch.push(newCorse);
    }
    const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
    let courses = model.getCoursesFromDB(userEmail);
    courses.then(function (coursesFromDB) {
      renderer.fillCourses(coursesFromSearch, "plus", coursesFromDB);
    });
  });
};

$("body").on("click", ".searchButton", async function () {
  getAvailableCourses();
});

$(".loginbtn").on("click", function () {
  const email = logEmailField.val();
  const pass = logPassField.val();

  if (email == "" || pass == "") {
    ErrorDiv.empty();
    ErrorDiv.show();
    ErrorDiv.append(`<p>please fill the fields</p>`);
  } else {
    model.login(email, pass);
  }
});

const getStudentCourses = function () {
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  let courses = model.getCoursesFromDB(userEmail);

  courses.then(function (coursesFromDB) {
    renderer.fillCourses(coursesFromDB, "minus");
  });
};

$(".regbtn").on("click", function () {
  if (regEmailField.val() == "" || regName.val() == "" || regPass.val() == "") {
    ErrorDiv.empty();
    ErrorDiv.show();
    ErrorDiv.append(`<p>Please Fill The Fields</p>`);
    regEmailField.val("");
    regName.val("");
    regPass.val("");
    $("#student").checked = false;
    $("#teacher").checked = false;
    return;
  }

  if (!validEmail(regEmailField.val())) {
    ErrorDiv.empty();
    ErrorDiv.show();
    ErrorDiv.append(`<p>Invalid Email</p>`);
    regEmailField.val("");
    regName.val("");
    regPass.val("");
    $("#student").checked = false;
    $("#teacher").checked = false;
    return;
  }

  let type;
  if ($("#student").checked) type = "student";
  else type = "teacher";

  const newUser = {
    email: regEmailField.val(),
    name: regName.val(),
    password: regPass.val(),
    courses: [],
  };

  if (type == "teacher") {
    newUser.students = [];
  }

  model.createUser(newUser);
});

///////////////

$("body").on("click", ".addCourseBTN", function () {
  let courseId = $(this).closest("tr").find(".hidden").text();
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  let x = model.addCourse(courseId, userEmail);
  x.then(function () {
    let courses = model.getCoursesFromDB(userEmail);
    courses.then(function (coursesFromDB) {
      renderer.fillCourses(coursesFromDB, "minus");
      searchContainer.empty();
      getAvailableCourses();
    });
  });
});

$("body").on("click", ".removeCourseBTN", async function () {
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  const courseId = $(this).closest("tr").find(".hidden").text(); //maybe it'll need a fix

  if (confirm("are you sure to delete this corse")) {
    let x = model.removeCourse(userEmail, courseId);
    x.then(function () {
      let courses = model.getCoursesFromDB(userEmail);
      courses.then(function (coursesFromDB) {
        console.log(coursesFromDB);
        renderer.fillCourses(coursesFromDB, "minus");
      });
    });
  }
});

const loadContent = async function () {
  await getStudentCourses();
};
