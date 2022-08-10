class controler {
  addCourse() {
    let name = $("#addField").val();
    let startTime = $("#timeOfCourse").val();
    let teacher = "ahmad";
    courses.push({
      teacher: teacher,
      name: name,
      startTime: startTime,
      students: [],
    });
    R.renderTheTeacherCourses(courses);
  }
}
const C = new controler();

$("#buttonAdd").on("click", function () {
  C.addCourse();
});
