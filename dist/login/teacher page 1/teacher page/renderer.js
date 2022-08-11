var template = $("#handlebars").html();

var templateScript = Handlebars.compile(template);
class Render {
  renderTheTeacherCourses(courses) {
    $(".Info").empty();

    for (let i of courses) {
      let templateObj = {
        name: i.name,
        startTime: i.startTime,
        length: i.students.length,
      };
      var html = templateScript(templateObj);

      $(".courses").append(html);
    }
  }
  fillTeacherName(name) {
    name = "<h2>" + name + "</h2>";
    $(".teacherName").append(name);
  }
}
let R = new Render();
R.renderTheTeacherCourses(courses);
R.fillTeacherName("Ahmad Salous");
$(".courses").on("click", ".serach", function () {
  {
    $(".namesOfStudent").empty();
    let courseName = $(this).closest(".Info").find(".name").text();
    for (i of courses)
      if (i.name == courseName) {
        for (let j of i.students) $(".namesOfStudent").append(j + " ");
      }
  }
});
