const { expect, it } = require("@jest/globals");
const { turnLeft, turnRight, moveForward, processRobotInstructions } = require("./martianRobots");

describe("The robot should be able perform all basic movements", () => {
    const initialRobotPosition = [3, 2, "N"];

    it("Should be able to turn left", () => {
        const actual = turnLeft(initialRobotPosition);
        const expected = [3, 2, "W"];
        expect(actual).toEqual(expected);
    });

    it("Should be able to turn right", () => {
        const actual = turnRight(initialRobotPosition);
        const expected = [3, 2, "E"];
        expect(actual).toEqual(expected);
    });

    it("Should be able to move forward", () => {
        const actual = moveForward(initialRobotPosition);
        const expected = [3, 3, "N"];
        expect(actual).toEqual(expected);
    });
});

describe("The code should be able to perform a sequence of instructions and move the robot accordingly", () => {
    const matrixSize = [5, 3];
    const initialRobotPosition = [3, 2, "N"];

    it("Should be able to correctly determine the final robot position", () => {
        const scents = {}; // no previous scents
        const actual = processRobotInstructions(initialRobotPosition, "LLF", matrixSize, scents);
        const expected = [3, 1, "S"];
        expect(actual).toEqual(expected);
    });

    it("Should be able to determine if a robot is lost", () => {
        const scents = {}; // no previous scents
        const actual = processRobotInstructions(initialRobotPosition, "FFF", matrixSize, scents);
        const expected = [3, 5, "N", "LOST"];
        expect(actual).toEqual(expected);
    });

    it("Should be able to stop a robot from getting lost if there is a scent", () => {
        const scents = { 3: { 3: true } }; // previous scent at coordinates [3, 3] 
        const actual = processRobotInstructions(initialRobotPosition, "FFF", matrixSize, scents);
        const expected = [3, 3, "N"];
        expect(actual).toEqual(expected);
    });
});