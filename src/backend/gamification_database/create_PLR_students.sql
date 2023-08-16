-- STUDENTS (connected to "users" with additional information for ranked profiles and live scores)
CREATE TABLE IF NOT EXISTS PLR_students (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    display_name VARCHAR(256) NOT NULL,
    color VARCHAR(256) NOT NULL,
    live_score INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT unique_student_user UNIQUE (user_id)
);