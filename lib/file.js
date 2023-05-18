import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function initGame(inputFile) {
  let map = { mountains: [], tresors: [], adventurers: {} },
    moves = [];

  try {
    const data = fs.readFileSync(path.join(__dirname, inputFile), "utf8");

    const lines = data.split("\n");
    lines.forEach((line) => {
      switch (line.split("-")[0]) {
        case "C":
          let [dump, cols, rows] = line.split("-");
          [map.cols, map.rows] = [parseInt(cols), parseInt(rows)];
          break;
        case "M":
          let [_1, mcol, mrow] = line.split("-");
          map.mountains.push({ col: parseInt(mcol), row: parseInt(mrow) });
          break;
        case "T":
          let [_2, tcol, trow, count] = line.split("-");
          map.tresors.push({
            col: parseInt(tcol),
            row: parseInt(trow),
            count: parseInt(count),
          });
          break;
        case "A":
          let [_3, adventurer, acol, arow, orientation, amoves] =
            line.split("-");
          map.adventurers[adventurer] = {
            col: parseInt(acol),
            row: parseInt(arow),
            orientation,
            tresors: 0,
          };
          amoves.split("").forEach((type) => {
            moves.push({ adventurer, type });
          });
          break;

        default:
          break;
      }
    });
  } catch (error) {
    console.log("error from initGame", error);
  }

  return { map, moves };
}

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

export function writeMapToFile(map, outputFile) {
  let content = "";

  content += `C-${map.cols}-${map.rows}\n`;

  content += map.mountains
    .map((mountain) => {
      return `M-${mountain.col}-${mountain.row}`;
    })
    .join("\n");

  content +=
    `\n` +
    map.tresors
      .map((tresor) => {
        return `T-${tresor.col}-${tresor.row}-${tresor.count}`;
      })
      .join("\n");

  content +=
    `\n` +
    Object.entries(map.adventurers)
      .map(([adventurer, value]) => {
        return `A-${adventurer}-${value.col}-${value.row}-${value.orientation}-${value.tresors}`;
      })
      .join("\n");

  try {
    fs.writeFileSync(path.join(__dirname, outputFile), content);
  } catch (err) {
    console.error(err);
  }
}
