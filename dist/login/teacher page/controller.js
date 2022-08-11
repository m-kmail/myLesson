const renderer = new Render();
renderer.renderTheTeacherCourses(courses);

function printViewedStudents() {
  const courseName = $(this).closest("tr").find(".courseName").html();
  const studentName = courses
    .filter((course) => course.name === courseName)
    .map((c) => c.students);
  renderer.renderViewedStudents(studentName, courseName);
}
$("body").on("click", ".courseViewStudent", printViewedStudents);

function addCourse() {
  let teacher = $(".teacherName").html();
  console.log(teacher);
  let name = $(`#courseName`).val();
  console.log(name);
  let startTime = $(`#courseStartTime`).val();
  console.log(startTime);
  courses.push({
    teacher: teacher,
    name: name,
    startTime: startTime,
    students: [],
  });
  renderer.renderTheTeacherCourses(courses);
}
$("body").on("click", ".addCourseBtn", addCourse);
