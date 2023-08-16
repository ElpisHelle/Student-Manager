const bcrypt = require('bcryptjs');
const { pool } = require('../db');

async function getUserByUsername(username) {
  var query = `
  SELECT
   *
  FROM
    users
  WHERE
    user_name = $1`;
  const { rows } = await pool.query(query, [username]);
  return rows[0];
}

async function getStudentId(userId) {
  var query = `
  SELECT
   id
  FROM
    PLR_students
  WHERE
    user_id = $1`;
  const studentId = (await pool.query(query, [userId])).rows[0];
  return studentId;
}

async function createUser(username, password, student_id, display_name, color) {
  const hashedPassword = await bcrypt.hash(password, 10);
  var query1 = `
  INSERT INTO
   users (user_name, password)
  VALUES
    ($1, $2) RETURNING *`;
  const user = (await pool.query(query1, [username, hashedPassword])).rows[0];

  var query2 = `
  INSERT INTO
   PLR_students (id, user_id, display_name, color, live_score)
  VALUES
    ($1, $2, $3, $4, $5) RETURNING *`;

  const student = (await pool.query(query2, [student_id, user.id, display_name, color, 0])).rows[0];
  
  return {user, student, color};
}

module.exports = { getUserByUsername, getStudentId, createUser };