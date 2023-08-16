-- ACHIEVEMENTS (actual types of achievements)
CREATE TABLE IF NOT EXISTS PLR_achievements (
    id SERIAL PRIMARY KEY,
    achievement_name VARCHAR(50) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    achievement_description VARCHAR(256)
);

-- HAS_ACHIEVED (checks which achievements a student has won, and how many)
CREATE TABLE IF NOT EXISTS PLR_has_achieved (
    student_id BIGINT,
    achievement_id BIGINT,
    amount INT,
    PRIMARY KEY (student_id, achievement_id),
    FOREIGN KEY (student_id) REFERENCES PLR_students (id),
    FOREIGN KEY (achievement_id) REFERENCES PLR_achievements (id)
);