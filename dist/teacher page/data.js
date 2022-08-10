const courses = [
    {
        name: "math",
        startTime: "9:00AM",
        teacher: "methqal",
        students: ["ali", "abeer"],
      },
      {
        name: "arabic",
        startTime: "11:00AM",
        teacher: "mahmoud",
        students: ["areen", "abeer"],
      }
  ];



  const teacher = [
    {
      name: "methqal",
      email: "methqal@teacher.com",
      passowrd: "1234",
      cousres: [
        {
            name: "math",
            startTime: "9:00AM",
            teacher: "methqal",
            students: ["ali", "abeer"],
          },
      ],
      students: [],
    },
    {
        name: "mahmoud",
        email: "mahmoud@teacher.com",
        passowrd: "1234",
        cousres: [
            {
                name: "arabic",
                startTime: "11:00AM",
                teacher: "mahmoud",
                students: ["areen", "abeer"],
              },
            ],
        students: [],
      },
  ];

  

  const student = [
    {
      name: "ali",
      passowrd: "123456789",
      courses: [
        {
          name: "math",
          startTime: "9:00AM",
          teacher: "methqal",
          students: ["ali", "abeer"],
        },
      ],
      email: "ali@student.com",
    },
    {
        name: "areen",
        passowrd: "123456789",
        courses: [
          {
            name: "arabic",
            startTime: "11:00AM",
            teacher: "mahmoud",
            students: ["areen", "abeer"],
          },
        ],
        email: "areen@student.com",
      },
      {
        name: "abeer",
        passowrd: "123456789",
        courses: [
          {
            name: "arabic",
            startTime: "11:00AM",
            teacher: "mahmoud",
            students: ["areen", "abeer"],
          },
          {
            name: "math",
            startTime: "9:00AM",
            teacher: "methqal",
            students: ["ali", "abeer"],
          },
        ],
        email: "abeer@student.com",
      }
  ];