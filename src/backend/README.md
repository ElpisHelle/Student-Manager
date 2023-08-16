# DB Schema/Table Description

**dummy_db.sql is obsolete**, it's being kept solely for insert statements and record keeping.

Each create folder needs a timestamp before being insert into PL migrations folder and those can be generate with this command:

`node -e "console.log(new Date().toISOString().replace(/\D/g,'').slice(0,14))"`

The folders need the following format {timestamp}_{create name} as described in the [PL migration readme](https://github.com/PrairieLearn/PrairieLearn/blob/master/apps/prairielearn/src/migrations/README.md).

Place all backend code in this directory; this includes Python files, SQL files, and any other backend code. We are using PostgreSQL as our database, so any SQL files should be written for it.

---

## Table: users

This table stores user information.

| Column    | Type         | Description              |
| --------- | ------------ | ------------------------ |
| id        | SERIAL       | Primary key              |
| user_name | VARCHAR(256) | User name (not nullable) |
| password  | VARCHAR(256) | Password (not nullable)  |

## Table: course

This table represents courses.

| Column             | Type          | Description                |
| ------------------ | ------------- | -------------------------- |
| id                 | SERIAL        | Primary key                |
| course_name        | VARCHAR(256)  | Course name (not nullable) |
| course_code        | VARCHAR(8)    | Course code (not nullable) |
| course_description | VARCHAR(5000) | Course description         |

## Table: job_sequence

This table represents the job sequence, indicating who is a staff member and their associated course.

| Column       | Type    | Description                                             |
| ------------ | ------- | ------------------------------------------------------- |
| id           | SERIAL  | Primary key                                             |
| is_professor | BOOLEAN | Indicates if the user is a professor (not nullable)     |
| course_id    | BIGINT  | Foreign key referencing the course table (not nullable) |
| user_id      | BIGINT  | Foreign key referencing the users table (not nullable)  |

## Table: semester

This table represents semesters associated with courses.

| Column    | Type        | Description                                             |
| --------- | ----------- | ------------------------------------------------------- |
| id        | SERIAL      | Primary key                                             |
| sem_name  | VARCHAR(30) | Semester name (not nullable)                            |
| course_id | BIGINT      | Foreign key referencing the course table (not nullable) |

## Table: enrollment

This table represents the enrollment of users in semesters.

| Column  | Type   | Description                                               |
| ------- | ------ | --------------------------------------------------------- |
| id      | SERIAL | Primary key                                               |
| sem_id  | BIGINT | Foreign key referencing the semester table (not nullable) |
| user_id | BIGINT | Foreign key referencing the users table (not nullable)    |

## Table: assessments

This table represents assessments associated with semesters.

| Column | Type   | Description                                               |
| ------ | ------ | --------------------------------------------------------- |
| id     | SERIAL | Primary key                                               |
| sem_id | BIGINT | Foreign key referencing the semester table (not nullable) |

## Table: assessment_grade

This table represents the time and score for a student in relation to a specific assessment.

| Column         | Type      | Description                                                  |
| -------------- | --------- | ------------------------------------------------------------ |
| id             | SERIAL    | Primary key                                                  |
| user_id        | BIGINT    | Foreign key referencing the users table (not nullable)       |
| assess_id      | BIGINT    | Foreign key referencing the assessments table (not nullable) |
| time_submitted | TIMESTAMP | Time of submission                                           |
| score          | INT       | Score                                                        |

## Table: PLR_students

This table stores additional information about students connected to the "users" table.

| Column       | Type         | Description                                            |
| ------------ | ------------ | ------------------------------------------------------ |
| id           | SERIAL       | Primary key                                            |
| user_id      | BIGINT       | Foreign key referencing the users table (not nullable) |
| display_name | VARCHAR(256) | Display name (not nullable)                            |
| color        | VARCHAR(256) | Color (not nullable)                                   |
| live_score   | BIGINT       | Live score (not nullable)                              |

## Table: PLR_achievements

This table represents actual types of achievements.

| Column                  | Type         | Description                     |
| ----------------------- | ------------ | ------------------------------- |
| id                      | SERIAL       | Primary key                     |
| achievement_name        | VARCHAR(50)  | Achievement name (not nullable) |
| icon_name               | VARCHAR(50)  | Icon name (not nullable)        |
| achievement_description | VARCHAR(256) | Achievement description         |

## Table: PLR_has_achieved

This table checks which achievements a student has won and how many.

| Column         | Type                         | Description                                         |
| -------------- | ---------------------------- | --------------------------------------------------- |
| student_id     | BIGINT                       | Foreign key referencing the PLR_students table      |
| achievement_id | BIGINT                       | Foreign key referencing the PLR_achievements table  |
| amount         | INT                          | Number of achievements                              |
| PRIMARY KEY    | (student_id, achievement_id) | Primary key combining student_id and achievement_id |

## Table: PLR_live_session

This table represents the live session ID.

| Column | Type   | Description |
| ------ | ------ | ----------- |
| id     | SERIAL | Primary key |

## Table: PLR_live_session_credentials

This table stores credentials for live sessions.

| Column         | Type      | Description                                                  |
| -------------- | --------- | ------------------------------------------------------------ |
| id             | SERIAL    | Primary key                                                  |
| student_id     | INT       | Foreign key referencing the PLR_students table               |
| scoreboard_id  | INT       | Foreign key referencing the PLR_live_session table           |
| assess_id      | BIGINT    | Foreign key referencing the assessments table (not nullable) |
| time_submitted | TIMESTAMP | Time of submission                                           |
| score          | BIGINT    | Score                                                        |

## Table: PLR_seasonal_scoreboard

This table updates itself with information from live sessions.

| Column     | Type                     | Description                                                   |
| ---------- | ------------------------ | ------------------------------------------------------------- |
| id         | SERIAL                   | Primary key                                                   |
| sem_id     | BIGINT                   | Foreign key referencing the semester table (not nullable)     |
| student_id | BIGINT                   | Foreign key referencing the PLR_students table (not nullable) |
| score      | BIGINT                   | Score                                                         |
| total_time | INTERVAL                 | Total time                                                    |
| created_at | TIMESTAMP WITH TIME ZONE | Creation timestamp with time zone, default: current timestamp |
