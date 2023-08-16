const express = require("express");
const router = express.Router();
const path = require("path");
const { getUserByUsername, createUser } = require("../models/users");

const registration_path = path.join(
  __dirname,
  "..",
  "frontend",
  "registration.html"
);

// Registration route - get
router.get("/registration", (req, res) => {
  if (req.session.userId) {
    console.log(
      `You are already logged-in under this session id: ${req.session.userId}, you must log out to register a new user`
    );
    res.sendFile(path.join(plr_main_path));
    return;
  }
  res.sendFile(path.join(registration_path));
});

// Registration route - post
router.post("/registration", async (req, res) => {
  const { username, password, student_id, display_name, color } = req.body;

  //check if the user already exists
  const existingUser = await getUserByUsername(username);

  //user check
  if (existingUser) {
    res.status(201);
    console.log(`user already exists: ${existingUser.user_name}`);
    return res.redirect("/registration");
  }

  const newUser = await createUser(
    username,
    password,
    student_id,
    display_name,
    color
  );

  //check if the user was created
  if (!newUser) {
    res.status(500);
    return res.redirect("/registration");
  }

  console.log(`registration successful for user: ${newUser.user.user_name}`);
  res.status(201);

  req.session.save((err) => {
    if (err) {
      // handle error
      return res.status(500);
    }
    res.redirect("/login");
  });
});

module.exports = router;
