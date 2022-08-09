function fillName() {
  $("#name").text("Mohammad Kamel");
}
fillName();
class StudentRendere {
  fillCourses(courses, buttonType) {
    let courseName, courseTime, teacher, classButton, classIcon, mainClassName;

    if (buttonType == "minus") {
      classButton = "removeCourse";
      classIcon = "fa-minus";
      mainClassName = ".myCorsess";
    } else {
      classButton = "addCourse";
      classIcon = "fa-plus";
      mainClassName = ".searchedCourses";
      console.log(mainClassName);
    }
    var template = $("#handlebars-demo").html();

    var templateScript = Handlebars.compile(template);
    for (let i of courses) {
      let templateObj = {
        courseName: i.name,
        courseTime: i.startTime,
        teacher: i.teacher,
        classIcon: classIcon,
      };
      var html = templateScript(templateObj);
      $(mainClassName).append(html);
    }
  }
}
let courses = [
  {
    name: "IT",
    startTime: "9AM",
    teacher: "lotem",
  },
];
let A = new StudentRendere();

A.fillCourses(courses, "minus");
A.fillCourses(courses, "sda");
