const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const studentRouter = require("./router/studentRoute");
const mentorRouter = require("./router/mentorRoute");

const db = process.env.DB_URL;
//console.log("db | ", db);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`databse connected succesfully`);
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.use(cors());
app.use(express.json());
app.use("/api/student", studentRouter);
app.use("/api/mentor", mentorRouter);

app.listen(5000, () => {
  console.log("app listening on port 5000");
});
