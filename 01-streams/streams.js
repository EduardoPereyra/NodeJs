import { createReadStream, readFileSync } from "fs";

console.time("readFileSync");

// for (let i = 0; i <= 10; i++) {
//   readFileSync("./files/output.txt", "utf8");
// }  // readFileSync: 1.594s

for (let i = 0; i <= 10; i++) {
  createReadStream("./files/output.txt", { encoding: "utf8" }); // readFileSync: 0.72ms
}

console.timeEnd("readFileSync");
