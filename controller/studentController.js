const { Student } = require("../models/studentModel");

const addStudent = async (req, res) => {
  const { email, name } = req.body;
  try {
    const alreadyExists = await Student.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({
        message:
          "Email address already exists. Try with different email address.",
      });
    }

    const student = new Student({
      name,
      email,
    });
    await student.save({ name, email });
    res.json({ message: "Student added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("mentor", "_id name");
    res.json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  addStudent,
  getStudents,
};
