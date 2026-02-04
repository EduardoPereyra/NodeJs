import { createReadStream, createWriteStream } from "fs";

const streamRead = createReadStream("./files/base.txt");
const streamWrite = createWriteStream("./files/base_copy.txt");

streamRead.pipe(streamWrite);
streamRead.on("end", () => console.log("Piping finished"));
streamRead.on("error", (err) => console.error("Error during piping:", err));
streamWrite.on("error", (err) => console.error("Error during writing:", err));
