/*
 -- CREATE TABLES:
 -- PrairieLearn (these are based off of existing tables in the PrairieLearn system)
 */

-- USERS
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL
);

-- COURSE
CREATE TABLE IF NOT EXISTS course (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(256) NOT NULL,
    course_code VARCHAR(8) NOT NULL,
    course_description VARCHAR(5000)
);

-- JOB_SEQUENCE (represents who is a staff member or not)
CREATE TABLE IF NOT EXISTS job_sequence (
    id SERIAL PRIMARY KEY,
    is_professor BOOLEAN NOT NULL,
    course_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- SEMESTER (a course can have multiple semesters)
CREATE TABLE IF NOT EXISTS semester (
    id SERIAL PRIMARY KEY,
    sem_name VARCHAR(30) NOT NULL,
    course_id BIGINT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course (id)
);

-- ENROLLMENT (which users are enrolled in which semesters)
CREATE TABLE IF NOT EXISTS enrollment (
    id SERIAL PRIMARY KEY,
    sem_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (sem_id) REFERENCES semester (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- ASSESSMENT (which semester is each assessment attached to)
CREATE TABLE IF NOT EXISTS assessments (
    id SERIAL PRIMARY KEY,
    sem_id BIGINT NOT NULL,
    FOREIGN KEY (sem_id) REFERENCES semester (id)
);

-- ASSESSMENT_GRADE (time and score for a student in relation to a specific assessment)
CREATE TABLE IF NOT EXISTS assessment_grade (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    assess_id BIGINT NOT NULL,
    time_submitted TIMESTAMP,
    score INT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (assess_id) REFERENCES assessments (id)
);

/*
 -- CREATE TABLES:
 -- PrairieLearn Ranked (PLR) (these are our own added fields)
 */

-- STUDENTS (connected to "users" with additional information for ranked profiles and live scores)
CREATE TABLE IF NOT EXISTS PLR_students (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    display_name VARCHAR(256) NOT NULL,
    color VARCHAR(256) NOT NULL,
    live_score INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT unique_student_user UNIQUE (user_id)
);

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

-- LIVE_SESSION (just the id of the live session)
CREATE TABLE IF NOT EXISTS PLR_live_session (
    id SERIAL PRIMARY KEY,
    -- This should be NOT NULL. This was removed for our current build but should be re-implemented once staff view is live.
    assess_id BIGINT,
    FOREIGN KEY (assess_id) REFERENCES assessments(id)
);

-- LIVE_SESSION_CREDENTIALS
CREATE TABLE IF NOT EXISTS PLR_live_session_credentials (
    id SERIAL PRIMARY KEY,
    student_id INT,
    session_id INT,
    time_submitted TIMESTAMP NOT NULL,
    score BIGINT NOT NULL DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES PLR_students (id),
    FOREIGN KEY (session_id) REFERENCES PLR_live_session (id)
);

-- SEASONAL_SCOREBOARD (updates itself with information from live sessions)
CREATE TABLE IF NOT EXISTS PLR_seasonal_scoreboard (
    id SERIAL PRIMARY KEY,
    sem_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    score BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES PLR_students (id),
    FOREIGN KEY (sem_id) REFERENCES semester (id)
);

--------------------------------------------------------------------

/*
-- MOCK VALUE INSERTS
-- PrairieLearn
*/

INSERT INTO
	users (user_name, password)
VALUES
	('John Smith', '1'),
	('Emma Johnson', '2'),
	('Michael Davis', '3'),
	('Olivia Brown', '4'),
	('William Wilson', '5'),
	('Sophia Taylor', '6'),
	('Ethan Anderson', '7'),
	('Ava Martinez', '8'),
	('James Clark', '9'),
	('Eren Yegor', '10'),
	('Louis Lascelles-Palys', '11'),
	('Sheel Patel', '12'),
	('Yegor Smertenko', '13'),
	('Charvie Yadav', '14'),
	('Rylan Cox', '15'),
	('Scott Fazackerley', '16'),
	('Ramon Lawrence', '17'),
	('Peter Parker', '18'),
	('Gwen Stacy', '19'),
	('Bruce Wayne', '20'),
	('Diana Prince', '21'),
	('Clark Kent', '22'),
	('Barry Allen', '23'),
	('Tony Stark', '24'),
	('Natasha Romanoff', '25'),
	('Steve Rogers', '26'),
	('Thor Odinson', '27'),
	('Peter Quill', '28'),
	('Wanda Maximoff', '29'),
	('Stephen Strange', '30'),
    ('Dr. Benjamin Robinson', '31');

INSERT INTO 
    course (course_name, course_code, course_description) 
VALUES
    ('Introduction to Database Systems', 
    'COSC304', 
    'This course provides an introduction to database systems including database querying, design, and programming. The course consists of three major components. The first component explains databases from a user perspective including how to query using SQL and relational algebra. The second component involves designing relational databases using Entity-Relationship (ER) diagrams and UML. The last part involves database and web programming with Java, JDBC, JSP, Python, and PHP. Students completing the course have experience with current database technologies, and the ability to use and develop databases and associated applications.'),
    ('Integral Calculus with Applications to Physical Sciences and Engineering',
    'MATH101',
    'Definite integral, integration techniques, applications, modelling, linear ODEs.');

INSERT INTO 
    semester (sem_name, course_id) 
VALUES
    ('W-2023', 1),
    ('S-2023', 1),
    ('W-2020', 2);

INSERT INTO
    enrollment (sem_id, user_id)
VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
    (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
    (2, 11), (2, 12), (2, 13), (2, 14), (2, 15),
    (2, 16), (2, 17), (2, 18), (2, 19), (2, 20),
    (3, 21), (3, 22), (3, 23), (3, 24), (3, 25),
    (3, 26), (3, 27), (3, 28), (3, 29), (3, 30);

INSERT INTO 
    job_sequence (is_professor, course_id, user_id) 
VALUES
    (TRUE, 1, 31),
    (TRUE, 2, 31);

INSERT INTO 
    assessments (sem_id) 
VALUES
    (1),
    (1),
    (2),
    (2),
    (3),
    (3);

INSERT INTO 
    assessment_grade (user_id, assess_id, time_submitted, score) 
VALUES
    (1, 1, NOW() + '00:10:00', 100),
	(2, 1, NOW() + '00:15:00', 90),
	(3, 1, NOW() + '00:20:00', 80),
	(4, 1, NOW() + '00:25:00', 70),
	(5, 1, NOW() + '00:30:00', 60),
	(6, 1, NOW() + '00:10:00', 60),
	(7, 1, NOW() + '00:15:00', 70),
	(8, 1, NOW() + '00:20:00', 80),
	(9, 1, NOW() + '00:25:00', 90),
	(10, 1, NOW() + '00:30:00', 100),
    (11, 2, NOW() + '00:10:00', 100),
	(12, 2, NOW() + '00:15:00', 90),
	(13, 2, NOW() + '00:20:00', 80),
	(14, 2, NOW() + '00:25:00', 70),
	(15, 2, NOW() + '00:30:00', 60),
	(16, 2, NOW() + '00:10:00', 60),
	(17, 2, NOW() + '00:15:00', 70),
	(18, 2, NOW() + '00:20:00', 80),
	(19, 2, NOW() + '00:25:00', 90),
	(20, 2, NOW() + '00:30:00', 100),
	(21, 3, NOW() + '00:10:00', 100),
	(22, 3, NOW() + '00:15:00', 90),
	(23, 3, NOW() + '00:20:00', 80),
	(24, 3, NOW() + '00:25:00', 70),
	(25, 3, NOW() + '00:30:00', 60),
	(26, 3, NOW() + '00:10:00', 60),
	(27, 3, NOW() + '00:15:00', 70),
	(28, 3, NOW() + '00:20:00', 80),
	(29, 3, NOW() + '00:25:00', 90),
	(30, 3, NOW() + '00:30:00', 100);

/*
-- MOCK VALUE INSERTS
-- PrairieLearn Ranked (PLR)
*/

INSERT INTO 
    PLR_students (user_id, display_name, color)
SELECT
    id, user_name, ''
FROM
    users
WHERE
    id NOT IN (
        SELECT
            user_id
        FROM
            job_sequence
    );

INSERT INTO 
    PLR_achievements (achievement_name, icon_name, achievement_description)
VALUES
    ('Gotta Go Fast', 'rocket_launch', 'Fastest to submit the quiz'),
    ('Slowpoke', 'elderly', 'Slowest to submit the quiz'),
    ('Enlightened', 'self_improvement', 'Best score in the semester (only 1 of these is cycled out per semester)'),
    ('Heartbroken', 'heart_broken', 'Worst score in the semester (only 1 of these is cycled out per semester)'),
    ('Gold/Silver/Bronze', 'workspace_premium', 'Top 3 scores (colored differently) in a live quiz'),
    ('The Thinker', 'psychology', 'Highest score with the slowest submission'),
    ('Hat Trick', 'school', '3 first place scores in a row'),
    ('Always On Time', 'emoji_people', 'Attended every quiz'),
    ('Half-Baked', 'cookie', 'Exactly half the maximum score (pass)'),
    ('Best of the Best', 'hotel_class', 'Given at the end of the semester to the top scorer');

INSERT INTO
    PLR_has_achieved (student_id, achievement_id, amount)
SELECT
    student_id,
    ROUND(RANDOM() * 7) + 1,
    1
FROM
    generate_series(1, 16) AS student_id
    CROSS JOIN generate_series(1, 3) ON CONFLICT DO NOTHING;

INSERT INTO PLR_live_session(assess_id)
SELECT
	id
FROM
	assessments;

INSERT INTO 
	PLR_live_session_credentials(student_id, session_id, time_submitted, score)
SELECT
	st.id, plrls.id, ag.time_submitted, ag.score
FROM
	assessment_grade AS ag
		JOIN PLR_students AS st ON st.user_id = ag.user_id
		JOIN PLR_live_session AS plrls ON plrls.assess_id = ag.assess_id;

INSERT INTO
	PLR_seasonal_scoreboard(sem_id, student_id, score)
SELECT 
	e.sem_id, s.id, SUM(plrls.score)
FROM 
	PLR_students s 
	JOIN enrollment e ON s.user_id = e.user_id 
	JOIN PLR_live_session_credentials plrls ON s.id = plrls.student_id 
GROUP BY s.id, e.sem_id;