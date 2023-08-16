# Drone CI Setup Documentation

## Initial Setup

To get Drone setup, firstly login to the UBC-O Drone website at https://droneci.ok.ubc.ca/.

It will ask you to sign in using your GitHub account, and if the repository is private, you will need to **Request** the repo to be accessible. It will be in the same screen as the sign in screen for GitHub. Once that is done, you will be on the main Drone website.

Press **Sync** on the top right of the page to make sure it is updated with all the repositories. 

Find the repository that your group needs to be activated.

Once clicked on, if it is not already activated, press the activate button to make sure it can listen to drone events.

**Quick note. If after doing the GitHub Auth, it's asking you to sign up, just press continue and submit (leave the fields empty), and it will bring you to the main page.**

## Coding Setup

After setting up the website, now it is time to set up the drone.yml file.

Create a a file in the **ROOT** of your directory and call it `.drone.yml`.

The file is where the setup for the pipeline will go.

Shown below is an example of what a drone yml file could look like.

```
kind: pipeline
type: docker
name: default

steps:
- name: Install Dependencies
	image: node:14
	commands:
		- cd src
		- npm install

- name: Run Jest Tests
	image: node:14
	commands:
		- cd src
		- npm install jest
		- npx jest

```

This yml file will run all JavaScript tests using the JEST framework. The steps first install all the node dependencies, and then after uses the JEST commands to run the JavaScript test.

This is a good example of how to make the pipeline setup. **INSTALL DEPENDECIES FIRST, THE COMMANDS TO RUN TESTS**.

If there is a need to do other types of tests using different frameworks (Python, Selenium, etc.) make sure to install their dependencies first, then put the command to run the tests right after that.

**Make sure you are in the correct file path to where the  tests are so they can be found by the Drone pipeline.**


Once the yml file is setup, tests are correctly setup, you can commit changes, and on the drone website, it will show the branch and commit, and will show logs and the tests running with feedback.