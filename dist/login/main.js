//const render = new Renderer();

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

$(".loginbtn").on("click", function () {
  const email = logEmailField.val();
  const pass = logPassField.val();

  if (email == "" || pass == "") {
    ErrorDiv.empty();
    ErrorDiv.show();
    ErrorDiv.append(`<p>please fill the fields</p>`);
  } else {
    $.get(`/user/${email}`, (user) => {
      if (!user) {
        ErrorDiv.empty();
        ErrorDiv.show();
        ErrorDiv.append(`<p>Invalid Email</p>`);
      } else {
        if (user.password != pass) {
          ErrorDiv.empty();
          ErrorDiv.show();
          ErrorDiv.append(`<p>Invalid Password</p>`);
        } else {
          //render => if student ===> go to student page
          // if teacher => render to go to teacher page
          ErrorDiv.empty();
        }
      }
    });
  }
});

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
    students: [],
  };

  $.post("/addUser", newUser, function (result) {
    if (result == "") {
      ErrorDiv.empty();
      //email
      //render => go to login
    } else {
      ErrorDiv.empty();
      ErrorDiv.show();
      ErrorDiv.append(`<p>${result}</p>`);
      regEmailField.val("");
      regName.val("");
      regPass.val("");
    }
  });
});

const getStudentCourses = function (userEmail) {
  $.get(`/courses/${userEmail}`, function (courses) {
    //render.renderCoursesForStudent(courses);
  });

  $("body").on("click", ".removeCourse", function (userEmail) {
    const courseTime = $(this).closest(".course").find(".course-time").text;

    $.ajax({
      method: "Delete",
      url: `/courses/${userEmail}/${courseTime}`,
      success: function () {
        //render the page again
      },
    });
  });
};
