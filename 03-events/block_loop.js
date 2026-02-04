import { createReadStream, readFileSync } from "fs";
import http from "http";

function readFile() {
  //   readFileSync("./files/file.txt", "utf8"); // Load: 1.25 s

  const data = createReadStream("./files/file.txt", { encoding: "utf-8" }); // Load: 44 ms
}

http
  .createServer((req, res) => {
    for (let a = 0; a < 500; a++) {
      readFile();
    }
    res.write("Hello world!\n");
    res.end("File read completed");
  })
  .listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
