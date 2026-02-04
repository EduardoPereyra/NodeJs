import { createReadStream } from "fs";

const streamRead = createReadStream("./files/output.txt", { encoding: "utf8" });

streamRead
  .on("open", () => {
    console.log("Opening file for reading...");
  })
  .on("data", (chunk) => {
    console.log("New chunk received");
  })
  .on("end", () => {
    console.log("Finished reading the file.");
  })
  .on("error", (err) => {
    console.error("An error occurred while reading the file:", err);
  });
