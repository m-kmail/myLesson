  const content = $(".teacherCourses");
  class Render {
    renderTheTeacherCourses(courses) {
      content.empty()
      $('.teacherName').empty()
      $('.teacherName').append(`${courses[0].teacher}`)
      let source = $("#course-template").html();
      let templete = Handlebars.compile(source);
      let newHTML = templete({courses});
      content.append(newHTML);
     
    }
  
    renderViewedStudents(students,courseName) {
      
      const viewedStudentContent = $(".viewedStudent"+courseName);
      viewedStudentContent.empty()
      let source = $("#studentViewed-template").html();
      let templete = Handlebars.compile(source);
      let newHTML = templete({students});
      viewedStudentContent.append(newHTML);
  
    }
  }
  