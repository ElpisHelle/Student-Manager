# PrairieLearn Walkthrough

## Overview/Discoveries

Reading the `.md` README files are the best way to learn, as the developer guide is out of date. The developers are incredibly responsive on Slack and GitHub Discussions, so don't be afraid to ask questions.

Database changes are done through [**migrations**](https://github.com/PrairieLearn/PrairieLearn/blob/master/apps/prairielearn/src/migrations/README.md). Enter their `migrations` folder, make a new SQL file with the current timestamp (to get current timestamp, run this command in command prompt: `node -e "console.log(new Date().toISOString().replace(/\D/g,'').slice(0,14))"`) and a small description (following the template of other migration files). Add queries as needed, close the container, and re-run the commands to run the application locally.

Unless your editing html or ejs files, everytime you make a change, you will have to close the container down, and re-run the commands.

## Commands

[Running locally](https://github.com/PrairieLearn/PrairieLearn/blob/master/docs/installingLocal.md):
1. `git clone https://github.com/PrairieLearn/PrairieLearn.git`
2. `docker run -it --rm -p 3000:3000 -w /PrairieLearn -v /path/to/PrairieLearn:/PrairieLearn prairielearn/prairielearn /bin/bash`
   - The path `/path/to/PrairieLearn` above should be replaced with the absolute path to the PrairieLearn source on your computer. If you're in the root of the source directory already, you can substitute `%cd%` (on Windows command prompt outside WSL), `${PWD}` (on Windows PowerShell), or `$PWD` (Linux, MacOS, and WSL) for /path/to/PrairieLearn.
3. `make deps`
4. `make dev` (or `make start` if you're running it in production mode)

> NOTE: On Apple Silicon, step 2 is done differently through emulation: `docker run --platform linux/x86_64 -it --rm -p 3000:3000 -w /PrairieLearn -v $PWD:/PrairieLearn prairielearn/prairielearn /bin/bash`

## Links
- [Contributing Page](https://github.com/PrairieLearn/PrairieLearn/blob/master/CONTRIBUTING.md)
  - This page describes the process of contributing to the existing PrairieLearn infrastructure, including setup, development, and opening pull requests.
- [PrairieLearn Slack](https://prairielearn.slack.com/join/shared_invite/zt-13kx0hg6v-uuC3kyt_3iBxjSpyhCbYVw#/shared-invite/email)
  - The PrairieLearn Slack is a great place to ask questions and get help from the PrairieLearn developers, mostly in the "pl_help" channel.
- [GitHub Discussions](https://github.com/PrairieLearn/PrairieLearn/discussions)
  - The GitHub Discussions page is useful for getting more formalized answers to questions, and directly linking them as issues. [Nathan Walters](https://github.com/nwalters512) is the main developer who answers questions directly.
- [Zoom](https://illinois.zoom.us/j/97570655417?pwd=SnByVzFaUXVlb1BIcjhZRHhEQ05Ldz09#success)
  - Office hours are hosted from 12:00-1:00pm on Thursdays.

## GitHub Discussions Answers

### [Inserting New Tables into the Database](https://github.com/PrairieLearn/PrairieLearn/discussions/8141)

### [Getting PrairieLearn Running on an Apple Silicon Mac](https://github.com/PrairieLearn/PrairieLearn/discussions/8142)