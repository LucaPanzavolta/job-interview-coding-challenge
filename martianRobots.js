/* 
    The last position before a robot trips over the edge of the planet will be recorded in the "scents" object
    in the following format: 

    const scents = {
        3: {
            4: true
        }
    }

    This way of storing data gives us a very convenient data structure to quickly access locations that left a scent.
    In the example above "3" represents the x coordinate while "4" represents the y coordinate.
*/


function initializeScentDB() {
  const scents = {} // initial state is an empty object
  return scents;
}

function moveForward([x, y, orientation]) {
  switch (orientation) {
    case "N":
      return [x, y + 1, orientation];
    case "S":
      return [x, y - 1, orientation];
    case "E":
      return [x + 1, y, orientation];
    case "W":
      return [x - 1, y, orientation];
    default:
      throw new Error("The orientation passed in is not a valid value.");
  }
}

function turnLeft([x, y, orientation]) {
  switch (orientation) {
    case "N":
      return [x, y, "W"];
    case "S":
      return [x, y, "E"];
    case "E":
      return [x, y, "N"];
    case "W":
      return [x, y, "S"];
    default:
      throw new Error("The orientation passed in is not a valid value.");
  }
}

function turnRight([x, y, orientation]) {
  switch (orientation) {
    case "N":
      return [x, y, "E"];
    case "S":
      return [x, y, "W"];
    case "E":
      return [x, y, "S"];
    case "W":
      return [x, y, "N"];
    default:
      throw new Error("The orientation passed in is not a valid value.");
  }
}

function isOutsideMatrix([x, y], [maxAllowedX, maxAllowedY]) {
  if (x < 0 || y < 0) return true;
  if (x > maxAllowedX || y > maxAllowedY) return true;
  return false;
}

function mapInstructionToFunction(newInstruction) {
  const map = {
    "L": turnLeft,
    "R": turnRight,
    "F": moveForward
  };

  if (map[newInstruction]) return map[newInstruction];
  throw new Error("Invalid Instruction.");
}

function logPositionAfterInstruction(newPosition, instruction) {
  console.log("New position at: ", newPosition, "after perfoming instruction: ", instruction);
}

function logFinalPosition(finalPosition) {
  console.log("Final position at: ", finalPosition, "\n\n\n");
}

/*
  the "processRobotInstructions" function accepts (in order) the following arguments:
  [x, y, orientation] => which represents the starting position and orientation of the robot
  instructionString => a string containing a series of moves the robot has to perform (example: "FFLRLFF")
  matrixSize => the most top right coordinate in the matrix (example : [5, 3]),
  scents => an object that tracks the previous scents left by the lost robots
*/

function processRobotInstructions([x, y, orientation], instructionString, matrixSize, scents) {
  let isRobotLost = false;

  const instructionsArray = instructionString.split("");

  // Here we go through all the single instructions with a reduce algorithm
  // the output of one operation constitutes the input for the following operation
  // The initial state of the accumulator is set to [x, y, orientation] which represents the initial position of the robot before any move is made
  // And then all instructions are executed in order and the final output the is the final position of the robot

  const finalRobotPosition = instructionsArray.reduce((accumulator, instruction) => {
    const moveRobot = mapInstructionToFunction(instruction);
    const robotPositionAfterMove = moveRobot(accumulator);

    if (!isRobotLost) {
      const isRobotOutsideMatrix = isOutsideMatrix(robotPositionAfterMove, matrixSize);

      if (isRobotOutsideMatrix) {
        // let's check if we can ignore the current instruction because of a previous scent
        const [currentX, currentY] = accumulator;
        const doesCurrentPositionHaveScent = scents[currentX] ? scents[currentX][currentY] : undefined;

        if (!doesCurrentPositionHaveScent) {
          // we cannot ignore the current instruction, therefore the robot is from now on considered lost 
          isRobotLost = true;
          scents[currentX] = { [currentY]: true };
        } else {
          // there was a smell in the current position of the robot, so we can ignore the instruction and return current position (contained in the accumulator)
          logPositionAfterInstruction(accumulator, instruction)
          return accumulator
        }
      }
    }

    logPositionAfterInstruction(robotPositionAfterMove, instruction);
    return robotPositionAfterMove;
  }, [x, y, orientation]);

  const result = isRobotLost ? finalRobotPosition.concat("LOST") : finalRobotPosition;
  logFinalPosition(result);
  return result;
}

module.exports = {
  initializeScentDB,
  moveForward,
  turnLeft,
  turnRight,
  processRobotInstructions
}