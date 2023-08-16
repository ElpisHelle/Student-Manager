const express = require("express");
const router = express.Router();
const { getLiveScoreWithName } = require("../models/students");
const { isAuthenticated } = require("../middleware/authentication");

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const studentId = req.session.studentId;
    const userId = req.session.userId;
    
    const liveScores = await getLiveScoreWithName();

    res.render("scores", { userId, studentId,liveScores });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/join-session", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.userId;
    const studentId = req.session.studentId;

    res.render("assessment", { userId, studentId });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
