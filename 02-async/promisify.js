import { writeFile } from "fs";
import { promisify } from "util";

// writeFile("./files/file.txt", "Hello, World!", () => {
//   console.log("File written successfully!");
// });

const writeFileAsync = promisify(writeFile);

writeFileAsync("./files/file2.txt", "Hello, Promisified World!")
  .then(() => {
    console.log("File written successfully with promisify!");
  })
  .catch((err) => {
    console.error("Error writing file with promisify:", err);
  });
