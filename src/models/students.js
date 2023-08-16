const { pool } = require("../db");
const redis = require("../redis");

// Update live score
async function updateLiveScore(userId, studentId, score, assessmentId) {
  let liveSessionId = await redis.get("liveSessionId");

  if (liveSessionId) {
    var selectStudentIdQuery = `
    SELECT
      student_id
    FROM
      PLR_live_session_credentials
    WHERE
      session_id = $1
      AND student_id = $2`;
    const { rows } = await pool.query(selectStudentIdQuery, [
      liveSessionId,
      studentId,
    ]);

    const studentIdInLiveScoreboard = rows[0]?.student_id;

    if (!studentIdInLiveScoreboard) {
      var insertIntoScoreQuery = `
      INSERT INTO
        PLR_live_session_credentials (
            session_id,
            student_id,
            time_submitted
        )
      VALUES
        ($1, $2, CURRENT_TIMESTAMP)`;
      await pool.query(insertIntoScoreQuery, [
        liveSessionId,
        studentId,
      ]);
    }

    var updateScoreQuery = `
    UPDATE
      PLR_live_session_credentials
    SET
      score = score + $1,
      time_submitted = now()
    WHERE
      session_id = $2
      AND student_id = $3`;
    await pool.query(updateScoreQuery, [score, liveSessionId, studentId]);

    var updateStudentsLiveScoreQuery = `
    UPDATE
      PLR_students
    SET
      live_score = live_score + $1
    WHERE
      user_id = $2`;

    await pool.query(updateStudentsLiveScoreQuery, [score, userId]);
    return;
  }

  // Insert a new record into the live_scoreboard
  var insertIntoLiveScoreboard = `
  INSERT INTO
    PLR_live_session (id)
  VALUES
    (DEFAULT) RETURNING id`;
  const { rows } = await pool.query(insertIntoLiveScoreboard);

  liveSessionId = rows[0].id;
  await pool.query(
    "INSERT INTO PLR_live_session_credentials (session_id, student_id, time_submitted) VALUES ($1, $2, now())",
    [liveSessionId, studentId]
  );
  await redis.set("liveSessionId", liveSessionId);
}

async function getLiveScoreWithName() {
  const liveSessionId = await redis.get("liveSessionId");
  let result = [];
  if (!liveSessionId) {
    var query = `
    SELECT
      PLR_live_session_credentials.score,
      PLR_live_session_credentials.time_submitted,
      PLR_students.user_id,
      PLR_students.color,
      users.user_name,
      (
        SELECT ARRAY_AGG(PLR_achievements.icon_name)
        FROM PLR_achievements
        JOIN PLR_has_achieved ON PLR_achievements.id = PLR_has_achieved.achievement_id
        WHERE PLR_has_achieved.student_id = PLR_live_session_credentials.student_id
      ) AS achievements
    FROM
      PLR_live_session_credentials
      JOIN PLR_students ON PLR_live_session_credentials.student_id = PLR_students.id
      JOIN users ON PLR_students.user_id = users.id
    ORDER BY
      PLR_live_session_credentials.score DESC,
      PLR_live_session_credentials.time_submitted ASC`;
    result = await pool.query(query);
  } else {
    var query = `
    SELECT
      PLR_live_session_credentials.score,
      PLR_live_session_credentials.time_submitted,
      PLR_students.user_id,
      PLR_students.color,
      users.user_name,
      (
        SELECT ARRAY_AGG(PLR_achievements.icon_name)
        FROM PLR_achievements
        JOIN PLR_has_achieved ON PLR_achievements.id = PLR_has_achieved.achievement_id
        WHERE PLR_has_achieved.student_id = PLR_live_session_credentials.student_id
      ) AS achievements
    FROM
      PLR_live_session_credentials
      JOIN PLR_students ON PLR_live_session_credentials.student_id = PLR_students.id
      JOIN users ON PLR_students.user_id = users.id
    WHERE
      PLR_live_session_credentials.session_id = $1
    ORDER BY
      PLR_live_session_credentials.score DESC,
      PLR_live_session_credentials.time_submitted ASC`;
    result = await pool.query(query, [liveSessionId]);
  }

  return result.rows.map((row) => {
    return {
      score: row.score, // not row.live_score
      time: row.time_submitted,
      color: row.color,
      user_id: row.user_id,
      name: row.user_name, // ensure your users table has a column named "display_name"
      achievements: row.achievements,
    };
  });
}

module.exports = { updateLiveScore, getLiveScoreWithName };
