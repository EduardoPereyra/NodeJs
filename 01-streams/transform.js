import { createReadStream, createWriteStream } from "fs";
import { Transform } from "stream";

const streamRead = createReadStream("./files/base.txt");
const streamWrite = createWriteStream("./files/base_copy.txt");

streamRead.setEncoding("utf8");

const filter = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    console.log(`Chunk length: ${chunk.length}`);
    this.push(chunk.toUpperCase());
    callback();
  },
  final(callback) {
    console.log("No more data to read.");
    callback();
  },
});

streamRead.pipe(filter).pipe(streamWrite);
