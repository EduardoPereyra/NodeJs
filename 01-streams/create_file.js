import { createWriteStream } from "fs";
const file = createWriteStream("./files/output.txt");

// for (let i = 0; i <= 1e6; i++) {j
for (let i = 0; i <= 3000; i++) {
  file.write(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n"
  );
}

file.end();
