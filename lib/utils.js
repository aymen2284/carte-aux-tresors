// takes map, make the move and returns new map
export function next(map, move) {
  const newMap = JSON.parse(JSON.stringify(map));
  const adventurer = newMap.adventurers[move.adventurer];
  const tresors = newMap.tresors;

  if (move.type === "A") {
    [adventurer.col, adventurer.row] = moveForward(adventurer.orientation, {
      col: adventurer.col,
      row: adventurer.row,
    });
  } else {
    adventurer.orientation = turn(adventurer.orientation, move.type);
  }

  tresors.forEach((tresor) => {
    if (
      move.type === "A" &&
      tresor.col === adventurer.col &&
      tresor.row === adventurer.row &&
      tresor.count > 0
    ) {
      adventurer.tresors += 1;
      tresor.count -= 1;
    }
  });

  return moveIsPossible(
    map,
    { col: adventurer.col, row: adventurer.row },
    move.adventurer
  )
    ? newMap
    : map;
}

export function moveIsPossible(map, newPos, movingAdventurer) {
  let possible = true;

  // skip moutain
  map.mountains.forEach((mountain) => {
    if (mountain.col === newPos.col && mountain.row === newPos.row) {
      possible = false;
    }
  });

  // skip square occupied byt other player
  Object.entries(map.adventurers).map(([adventurer, value]) => {
    if (
      value.col === newPos.col &&
      value.row === newPos.row &&
      adventurer !== movingAdventurer
    ) {
      possible = false;
    }
  });

  // skip board overflow case
  if (newPos.col >= map.cols || newPos.row >= map.rows) {
    possible = false;
  }

  return possible;
}

export function moveForward(orientation, pos) {
  switch (orientation) {
    case "N":
      return [pos.col, (pos.row -= 1)];
    case "S":
      return [pos.col, (pos.row += 1)];
    case "O":
      return [(pos.col -= 1), pos.row];
    case "E":
      return [(pos.col += 1), pos.row];
  }
}

export function turn(orientation, moveType) {
  switch (orientation) {
    case "N":
      return moveType === "D" ? "E" : "O";
    case "S":
      return moveType === "D" ? "O" : "E";
    case "O":
      return moveType === "D" ? "N" : "S";
    case "E":
      return moveType === "D" ? "S" : "N";
  }
}
