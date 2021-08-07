const router = require("express").Router();

const { addStudent, getStudents } = require("../controller/studentController");

router.post("/add-student", addStudent);
router.get("/", getStudents);

module.exports = router;
