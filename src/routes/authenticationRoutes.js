const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const { getUserByUsername, getStudentId, getColor } = require('../models/users');


const login_path = path.join(__dirname, '..', 'frontend', 'login.html');

// Login route - get
router.get('/login',(req, res) => {
  if(req.session.userId) {
    console.log(`You are already logged-in under this session id: ${req.session.userId}, redirecting to profile page`);
    res.redirect('/');
    return;
  } 
  res.sendFile(path.join(login_path));
});

// Logout route - get
router.get('/logout', (req, res) => {
  console.log('Logout route hit');
  if(!req.session.userId) {
    console.log(`You are not logged-in, redirecting to login page`);
    res.redirect('/login');
    return;
  } 
  console.log(`session id: ${req.session.userId}`);//this is just for testing
  //destroy the session
  req.session.destroy(err => {
    if (err) {
      // handle error
      return res.status(500);
    }
    console.log(`You have been logged out, redirecting to login page`);
    res.redirect('/login');
  });
  return;
});

// Login route - post
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await getUserByUsername(username);

  if (!existingUser) {
    res.status(401)
    return res.redirect('/login');
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password); 

  if (!isValidPassword) {
    res.status(401)
    console.log(`invalid password for user: ${existingUser.user_name}`);
    return res.redirect('/login');
  }

  const studentId = await getStudentId(existingUser.id);
 
  req.session.userId = existingUser.id;
  
  
  req.session.studentId = studentId.id;

  console.log(`login successful for user: ${existingUser.user_name}`);
  res.status(201);
  
  req.session.save(err => {
    if (err) {
      // handle error
      return res.status(500).send('An error occurred, please try again later');
    }
    console.log(`session: ${req.session.id}`);//testing
    res.redirect('/');
  });
});

module.exports = router;
