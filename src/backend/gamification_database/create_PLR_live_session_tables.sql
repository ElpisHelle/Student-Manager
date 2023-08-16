-- LIVE_SESSION
CREATE TABLE IF NOT EXISTS PLR_live_session (
    id SERIAL PRIMARY KEY,
    assess_id BIGINT NOT NULL,
    FOREIGN KEY (assess_id) REFERENCES assessments(id)
);

-- LIVE_SESSION_CREDENTIALS
CREATE TABLE IF NOT EXISTS PLR_live_session_credentials (
    id SERIAL PRIMARY KEY,
    student_id INT NULL,
    session_id INT NOT NULL,
    time_submitted TIMESTAMP NOT NULL,
    score BIGINT NOT NULL DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES PLR_students (id),
    FOREIGN KEY (session_id) REFERENCES PLR_live_session (id)
);