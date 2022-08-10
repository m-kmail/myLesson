var bodyParser = require("body-parser");
app.use(bodyParser.json());

$.get("url", data, function (data) {
  ////Write ur function here
});
$.post("url", data, function (data) {
  ////Write ur function here
});
$.ajax({
  type: "delete",
  url: "url",
  data: "data",
  success: function (response) {
    //Write ur function here
  },
});
