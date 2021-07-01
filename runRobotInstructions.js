const { processRobotInstructions, initializeScentDB } = require('./martianRobots');

const scents = initializeScentDB();
const matrixSize = [5, 3];

// FIST ROBOT
const fistRobotInitialPosition = [1, 1, "E"];
const firstRobotInstructions = "RFRFRFRF";
processRobotInstructions(fistRobotInitialPosition, firstRobotInstructions, matrixSize, scents);

// SECOND ROBOT
const secondRobotInitialPosition = [3, 2, "N"];
const secondRobotInstructions = "FRRFLLFFRRFLL";
processRobotInstructions(secondRobotInitialPosition, secondRobotInstructions, matrixSize, scents);

// THIRD ROBOT
const thirdRobotInitialPosition = [0, 3, "W"];
const thirdRobotInstructions = "LLFFFLFLFL";
processRobotInstructions(thirdRobotInitialPosition, thirdRobotInstructions, matrixSize, scents);