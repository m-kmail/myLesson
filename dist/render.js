class Renderer {
  constructor() {}
  fillCourses(courses, buttonType, oldCourses) {
    let mainClassName;
    let handlebarsTemplate;
    if (buttonType == "minus") {
      handlebarsTemplate = $("#courses-template");
      for (let c of courses) {
        c.minus = true;
      }
      mainClassName = ".myCorsess";
    } else {
      if (buttonType == "plus") {
        handlebarsTemplate = $("#courses-template");
        mainClassName = ".searchedCourses";
        for (let c of courses) {
          for (let old in oldCourses) {
            if (
              c.id == oldCourses[old].id ||
              c.startTime == oldCourses[old].startTime
            ) {
              c.available = false;
              break;
            }
          }
          c.minus = false;
        }
      } else {
        if (buttonType == "students") {
          mainClassName = ".namesOfStudent";
          handlebarsTemplate = $("#studentsHandlebars");
        } else {
          if (buttonType == " ") {
            handlebarsTemplate = $("#courses-template");
            mainClassName = ".myCorsess";
          } else {
            handlebarsTemplate = $("#teacherHandlebars");
            mainClassName = ".myCorsess";
          }
        }
      }
    }
    $(mainClassName).empty();
    const source = handlebarsTemplate.html();
    const template = Handlebars.compile(source);
    const newHTML = template({ courses });
    $(mainClassName).append(newHTML);
  }

  displayName() {
    $(".header").empty();
    const source = $("#activeUserName").html();
    const template = Handlebars.compile(source);
    const newHTML = template({
      activeUser: JSON.parse(localStorage.getItem("userInfo")).name,
    });
    $(".header").append(newHTML);
  }
}
