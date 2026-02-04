import { writeFile, createWriteStream } from "fs";

let content = "1234567890";
let iterations = 15;

const streamWrite = createWriteStream("./files/largeFile.txt");

for (let i = 0; i < iterations; i++) {
  content += content;

  streamWrite.write(content, () => {
    console.log("largeFile.txt has been updated");
  });
}

writeFile("./files/largeFile2.txt", content, () => {
  console.log("largeFile2.txt has been created");
});
