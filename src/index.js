import { initGame, writeMapToFile } from "../lib/file.js";
import { next } from "../lib/utils.js";

function run() {
  let { map, moves } = initGame("../assets/gameInput.txt");
  // loop through `moves`
  let move;
  while ((move = moves.shift())) {
    map = next(map, move);
  }
  writeMapToFile(map, "../assets/gameResult.txt");
}

run();
