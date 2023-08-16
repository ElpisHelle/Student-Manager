# Setup

Certain files/folders are being `.gitignore`'d, so you will need to create them yourself. These include:

1. `src/.env`: This file contains the environment variables for the backend. Copy the contents of `src/.env_example`, create a `src/.env` file yourself, and paste the contents into this file.
2. `src/node_modules`: This folder contains all the dependencies for the project. Run `npm install` in the `src` folder to install all the dependencies.

Once all necessary files/folders are added, run `docker compose up` with Docker Desktop open on your computer. This will start:
- The **application** on port `3000`
- The **database** on port `5432`
- **Redis** on port `6379`

---

# PrairieLearn Gamification

## Automating Database Question Generation and Marking (B)

### Description

This project extends a pre-existing project from 2022 using an open source version of [PrairieLearn](https://github.com/PrairieLearn/PrairieLearn), a platform allowing automatic practice question generation/marking using Python. Due to 2 different groups working on this project, our group (group “B”) has the primary objective of extending the functionality of the existing PrairieLearn system by adding support for the _gamification_ of PrairieLearn courses. This enhancement is intended to add engagement and interactivity within the classroom, providing a more enjoyable learning experience for students across various disciplines. In achieving this, we will meet the evolving needs of learners and educators in the digital age.

### Team Members

Team members are listed in alphabetical order by last name; all team members shared roles, but team leads are listed below:

- Rylan Cox (Creative Lead)
- Louis Lascelles-Palys (Client Liaison)
- Sheel Patel (Integration Lead)
- Yegor Smertenko (Project Manager)
- Charvie Yadav (Technical lead)

### Client

The University of British-Columbia, and [Dr. Ramon Lawrence](ramon.lawrence@ubc.ca).