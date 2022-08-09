const corses = [
  {
    name: "IT",
    startTime: "9:00AM",
    teacher: "lotem",
    students: ["ahmad", "roaa"],
  },
];
const teacher = [
  {
    name: "lotem",
    email: "lotem@teacher.com",
    passowrd: "L1",
    cousres: [
      {
        name: "IT",
        startTime: "9:00AM",
        teacher: "lotem",
        students: ["ahmad", "roaa"],
      },
    ],
    students: [],
  },
];
const student = [
  {
    name: "Ahmad",
    passowrd: "1",
    corses: [
      {
        name: "IT",
        startTime: "9:00AM",
        teacher: "lotem",
        students: ["ahmad", "roaa"],
      },
    ],
    email: "ahmad@student.com",
  },
];
let name = "Mohammad Kamel";
function fillName(name) {
  $("#name").text(name);
}
fillName(name);
{
  /* <table class="mycourses">
<tr class="course">
    <td id="course-name">name</td>
    <td id="course-time">time</td>
    <td id="course-teacher">teacher</td>
    <td class="remove-course">remove</td>
  </tr>
</table> */
}

function fillCourses(courses, buttonType) {
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

  for (i of courses) {
    courseName = i.name;
    courseTime = i.startTime;
    teacher = i.teacher;
    $(mainClassName).append(`<tr class="course">
    
      <td id="course-name">${courseName}</td>
      <td id="course-time">${courseTime}</td>
      <td id="course-teacher">${teacher}</td>
      <td class="${classButton}"><i class=" fa-solid ${classIcon}" ></i></td>
    </tr>`);
  }
}
let courses = [
  {
    name: "roaa",
    startTime: "9AM",
    teacher: "lotem",
  },
];
fillCourses(courses, "minus");
fillCourses(courses, "sda");
