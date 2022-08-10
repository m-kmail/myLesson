class Renderer {
  constructor() {}
  fillCourses(courses, buttonType, oldCourses) {
    let mainClassName;

    if (buttonType == "minus") {
      for (let c of courses) {
        c.minus = true;
      }
      mainClassName = ".myCorsess";
    } else {
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
    }
    $(mainClassName).empty();
    const source = $("#courses-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({ courses });
    $(mainClassName).append(newHTML);
  }
}
