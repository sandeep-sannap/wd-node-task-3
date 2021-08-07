const Mentor = require("../models/mentorModel");

const { Student } = require("../models/studentModel");

const addMentor = async (req, res) => {
  const { email, name } = req.body;
  try {
    const alreadyExists = await Mentor.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({
        message:
          "Email address already exists. Try with different email address.",
      });
    }

    const mentor = new Mentor({
      name,
      email,
    });
    await mentor.save({ name, email });
    res.json({ message: "Mentor added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};
const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({}).populate("students", "_id name");
    res.json(mentors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const assignMentor = async (req, res) => {
  console.log(req.body);
  const { studentId, mentorId } = req.body;
  try {
    await Mentor.findByIdAndUpdate(
      { _id: mentorId },
      { $push: { students: studentId } }
    );
    await Student.findByIdAndUpdate(studentId, { mentor: mentorId });
    res.json({ message: "Assigned successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server.error." });
  }
};

const reAssign = async (req, res) => {
  console.log(req.body);
  const { studentId, mentorId } = req.body;

  try {
    await Mentor.findOneAndUpdate(
      { students: { $in: studentId } },
      { $pull: { students: studentId } }
    );

    await Mentor.findByIdAndUpdate(
      { _id: mentorId },
      { $push: { students: studentId } }
    );
    await Student.findByIdAndUpdate(studentId, { mentor: mentorId });
    res.json({ message: "Re Assigned successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  addMentor,
  getMentors,
  assignMentor,
  reAssign,
};
