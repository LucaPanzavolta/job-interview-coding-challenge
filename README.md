## Coding Challenge - Luca Panzavolta

## How to run the project

1. `git clone https://github.com/LucaPanzavolta/job-interview-coding-challenge.git` to clone the repo on your local machine
2. `npm install` to install the required dependencies

## How to run the sample input

`npm start` to run the script in runRobotInstructions.js

Running this script will produce some logs on the console.
The logs will represent the position of each robot after each move.
The final position, orientation and status (lost or not) of a robot will also be printed on the console.
I decided to keep the console.logs as a tool to help the reviewer of this code to better visualize and understand its functioning.
A part from the console.logs all other functions are pure, meaning that given the same input they will always produce the same output.
This chatecteristic of pure functions helps a lot when it comes to testing.

## Testing

`npm test` to execute the tests with Jest
