class controler {
  addCourse() {
    let name = $("#addField").val();
    let startTime = $("#timeOfCourse").val();
    let teacher = "ahmad";
    if (!name || !startTime) {
      alert("Please Fill all Empty Fields");
    } else {
      courses.push({
        teacher: teacher,
        name: name,
        startTime: startTime,
        students: [],
      });
      R.renderTheTeacherCourses(courses);
    }
  }
  deleteCourse() {
    alert("Delete");
  }
}
const C = new controler();

$("#buttonAdd").on("click", function () {
  C.addCourse();
});
$("body").on("click", ".fa-trash-can", function () {
  C.deleteCourse();
});
