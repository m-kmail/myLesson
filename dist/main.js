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
        length: c.length,
        minus: false,
        teacher: c.teacher.name,
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
    if (userEmail.includes("@student.com"))
      renderer.fillCourses(coursesFromDB, "minus");
    else {
      renderer.fillCourses(coursesFromDB, "teacher");
    }
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
  regEmailField.val("");
  regName.val("");
  regPass.val("");
  model.createUser(newUser);
});

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
  const courseId = $(this).closest("tr").find(".hidden").text();

  if (ok(courseId)) {
  }
});

$("body").on("click", ".addButton", async function () {
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  const courseName = $(this).closest(".add").find("#addField").val();
  let startTime = $(this).closest(".add").find("#timeOfCourse").val();
  startTime = (startTime[0] == "0" ? "" : startTime[0]) + startTime[1];

  let x = model.createNewCourse(userEmail, courseName, startTime);

  x.then(function () {
    let courses = model.getCoursesFromDB(userEmail);
    courses.then(function (coursesFromDB) {
      renderer.fillCourses(coursesFromDB, "teacher");
    });
  });
});

$("body").on("click", ".view", async function () {
  //const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  const courseId = $(this).closest("tr").find(".hidden").text();
  x = model.gitStudents(courseId);
  x.then(function (studentsCourse) {
    renderer.fillCourses(studentsCourse, "students");
  });
});

const loadContent = async function () {
  await getStudentCourses();
  renderer.displayName();
};
function openPopUp(courseId) {
  $("#popUp").addClass("openPopUp");
  $("#popup").attr.data = courseId;
}
closePopUp = () => {
  $("#popUp").removeClass("openPopUp");
};

$("body").on("click", ".Yes", async function () {
  courseId = $("#popup").attr.data;
  const userEmail = JSON.parse(localStorage.getItem("userInfo")).email;
  let x = model.removeCourse(userEmail, courseId);
  x.then(function () {
    let courses = model.getCoursesFromDB(userEmail);
    courses.then(function (coursesFromDB) {
      //renderer.fillCourses(coursesFromSearch, "plus", coursesFromDB);
      renderer.fillCourses(coursesFromDB, " ");
      renderer.fillCourses(coursesFromDB, "minus");
      // renderer.fillCourses(coursesFromDB, "plus", []);
      if (userEmail.includes("@student.com")) {
        searchContainer.empty();
        getAvailableCourses();
      }
    });
  });
});

function ok(courseId) {
  openPopUp(courseId);
}
