import { promises } from "fs";

promises
  .copyFile("./files/original.txt", "./files/copied.txt")
  .then(() => {
    console.log("File copied successfully.");
  })
  .catch((error) => {
    console.error("Error copying file:", error);
  })
  .finally(() => {
    console.log("Copy operation attempted.");
  });
