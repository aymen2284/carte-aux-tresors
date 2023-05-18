import { moveForward, moveIsPossible, turn } from "./utils.js";

let map = {
  cols: 3,
  rows: 4,
  mountains: [
    { col: 1, row: 0 },
    { col: 2, row: 1 },
  ],
  adventurers: {
    // we'll assume adventurer name will play the role of a unique ID
    Lara: {
      col: 1,
      row: 1,
      orientation: "S",
      tresors: 0,
    },
  },
  tresors: [
    { col: 0, row: 3, count: 2 },
    { col: 1, row: 3, count: 3 },
  ],
};

const moves = [
  { adventurer: "Lara", type: "A" },
  { adventurer: "Lara", type: "A" },
  { adventurer: "Lara", type: "D" },
  { adventurer: "Lara", type: "A" },
  { adventurer: "Lara", type: "D" },
  { adventurer: "Lara", type: "A" },
  { adventurer: "Lara", type: "G" },
  { adventurer: "Lara", type: "G" },
  { adventurer: "Lara", type: "A" },
];

test("turn to right orientation", () => {
  expect(turn("E", "D")).toBe("S");
  expect(turn("S", "G")).toBe("E");
});

test("moving forward", () => {
  expect(moveForward("S", { col: 1, row: 1 })).toEqual([1, 2]);
});

describe("moveIsPossible()", () => {
  test("move should be possible", () => {
    expect(moveIsPossible(map, { col: 1, row: 2 })).toBeTruthy();
  });

  test("move should not be possible", () => {
    expect(moveIsPossible(map, { col: 1, row: 0 })).toBeFalsy();
  });
});
