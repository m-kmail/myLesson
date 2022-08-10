const express = require("express");
const urllib = require("urllib");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/myLessonDB", { useNewUrlParser: true });
const bodyParser = require(`body-parser`);
const port = 3000;

const path = require("path");
const api = require("./server/routes/api");
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist/login")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", api);

app.listen(port, function () {
  console.log(`working on ${port}`);
});
