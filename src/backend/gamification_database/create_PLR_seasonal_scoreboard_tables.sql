-- SEASONAL_SCOREBOARD
CREATE TABLE IF NOT EXISTS PLR_seasonal_scoreboard (
    id SERIAL PRIMARY KEY,
    course_instance_id BIGINT NOT NULL,
    FOREIGN KEY (course_instance_id) REFERENCES course_instances (id)
);

-- SEASONAL_SCOREBOARD_CREDENTIALS
CREATE TABLE IF NOT EXISTS PLR_seasonal_scoreboard_CREDENTIALS (
    id SERIAL PRIMARY KEY,
    scoreboard_id INT NOT NULL,
    student_id BIGINT NOT NULL,
    score BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (scoreboard_id) REFERENCES PLR_seasonal_scoreboard (id),
    FOREIGN KEY (student_id) REFERENCES PLR_students (id)
);