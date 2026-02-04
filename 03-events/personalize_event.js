import { createWriteStream, readFile } from "fs";
import { EventEmitter } from "events";

class Emitter extends EventEmitter {}
const emitter = new Emitter();

const writeStream = createWriteStream("./files/personalized_event.txt");

function writeInFile() {
  let iterations = 5;

  for (let i = 0; i < iterations; i++) {
    writeStream.write(`Writing line ${i + 1}\n`);
  }
  writeStream.write("=====END OF FILE=====\n");
  writeStream.end();
}

function sendEmail() {
  console.log("Sending email notification...");
  setTimeout(() => {
    console.log("Email sent successfully!");
    emitter.emit("emailSent");
  }, 1000);
}

function readDocument() {
  readFile("./files/personalized_event.txt", "utf8", (err, data) => {
    console.log(data.toString());
  });
}

writeStream.on("close", () => {
  sendEmail();
});

emitter.on("emailSent", () => {
  readDocument();
});

writeInFile();
