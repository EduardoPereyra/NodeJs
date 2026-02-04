import { createReadStream, createWriteStream } from "fs";
import { Duplex } from "stream";

const streamRead = createReadStream("./files/base.txt");
const streamWrite = createWriteStream("./files/base_copy.txt");

const report = new Duplex({
  write(data, encoding, callback) {
    console.log(data);
    callback();
  },
  read(size) {
    console.log(`Reading ${size} bytes`);
  },
});

streamRead.pipe(report).pipe(streamWrite);
