const router = require("express").Router();

const {
  addMentor,
  getMentors,
  assignMentor,
  reAssign,
} = require("../controller/mentorController");

router.post("/add-mentor", addMentor);
router.get("/", getMentors);
router.put("/assign", assignMentor);
router.put("/re-assign", reAssign);

module.exports = router;
