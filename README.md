API Util: This program is a utility for testing APIs in **NodeJS** JavaScript.  See the example in index.mjs for pragmatic use, or run the provided test cases.  Create and run new tests.  Tests for the provided APIs are included in the ./test folder.  Use `npm test` to run them.

Add new APIs to the src/service folder.

#### This is an example and testing framework primarily.
#### Run any number of the provided tests or write new tests and run them in indvidually.
#### *Write new Tests in the test folder; run them individually or in a suite.*

(*Compare this project against the Browser version to see how similar JavaScript is in NodeJS programs vs. Browser programs. [api-util-browser](https://github.com/TGillispie/api-util-browser) *)

The following table lists all currently configured API endpoints.
API | Description | Function
:---: | --- | ---
*OARS*
*-* | download file | `service.download`
*-* | upload file | `service.upload`
*-* | list files | `service.list`
*-* | insert db records | `service.insert`

## Quick Reference

- [Setup](#setup)
   - [Quick Setup](#quick-setup)
   - [Get the Code](#get-the-code)
   - [Install Dependencies](#install-dependencies)
   - [Setup Config](#setup-config)
- [Run](#run)
- [Program](#program)
   - [Program Files](#program-files)
- [Test](#test)
   - [Running Tests](#running-tests)
   - [Test Files](#test-files)
- [Legal](#legal)


## Setup

### Quick Setup
[localhost:3006](http://localhost:3006)
```bash
# Clone the project first then...
cd project
npm install

# Add any required keys or credentials to .env.
cp env-example .env

# Run the example program.
node index.mjs

# - OR - run any number of the provided tests or write new tests and run them in indvidually.
jasmine --config=test/support/jasmine.json  --color test/oars-four-zips-upload.mjs
```

### Get the Code
Clone this project from github.

### Install Dependencies
Run this command from the project root folder to install all dependencies listed in package.json.
```bash
npm install
```

### Setup Config
Copy and update any keys or credentials necessary for the project.
```bash
# Copy the example config to .env
cp env-example .env
```

## Run
Run the program using jasmine and/or NodeJS. This is an example app and testing framework primarily.  Running tests is this repositories intended usecase.
```bash
# Run any number of the provided tests or write new tests and run them in indvidually.
jasmine --config=test/support/jasmine.json  --color test/oars-four-zips-upload.mjs

# Or run the example program with nodemon; every time a src file changes it reloads.
npm run dev

# Or run the example API service implementation once.
node index.mjs
```


## Program

### Program Files
Most files are stored in the src folder.  The application entry point is index.html and is located in the root project folder.

File | Description
:---: | ---
 *-* | **Application**
*index.mjs* | Main module that loads and runs the program.  Modify this code to try different actions within the program.
*src/app.mjs* | The actual program; app.mjs configures and loads libraries and  dependencies and provides an interface for user actions.
 *-* | **State Management and Services**
*service/oars.mjs* | An implementation of the OARS API.
*state/global.mjs* | A global object for storing program data.
 *-* | **Common Library**
*lib/app-local.mjs* | A library of common custom application functions.


## Test

This project uses jasmine to run JavaScript tests in a command line.  Jasmine is a cross platform JavaScript test framework that works with NodeJS (backend), and in browsers (frontend).

### Running Tests
Tests can be run once or after file changes when using something like nodemon.  The test commands are configured in the package.json project config file for reference.
```bash
# Run tests once.
npm test

# Re-run tests every time a source file changes.
npm run dev-test

# Run a specific test.
jasmine --config=test/support/jasmine.json  --color test/oars-four-zips-upload.mjs
```

### Test Files
File | Description
--- | ---
*test* | Test folder holding all tests and test configuration.
*test/support* | Test configuration files.


## Legal

This repository is a scientific product and is not official communication of the National Oceanic and Atmospheric Administration, or the United States Department of Commerce. All NOAA GitHub project code is provided on an ‘as is’ basis and the user assumes responsibility for its use. Any claims against the Department of Commerce or Department of Commerce bureaus stemming from the use of this GitHub project will be governed by all applicable Federal law. Any reference to specific commercial products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not constitute or imply their endorsement, recommendation or favoring by the Department of Commerce. The Department of Commerce seal and logo, or the seal and logo of a DOC bureau, shall not be used in any manner to imply endorsement of any commercial product or activity by DOC or the United States Government.
