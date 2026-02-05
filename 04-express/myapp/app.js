import createError from "http-errors";
import express, { json, urlencoded, static as serveStatic } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { createReadStream, createWriteStream, stat } from "fs";
import { promisify } from "util";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import exampleRouter from "./routes/example.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileInfo = promisify(stat);

var app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveStatic(join(__dirname, "public")));

app.use(serveStatic(join("files")));

app.get("/download/:user_name", (req, res) => {
  const writeStream = createWriteStream(`${__dirname}/files/text2.txt`);
  writeStream.write(`Hello ${req.params.user_name}`, () => {
    res.download(`${__dirname}/files/text2.txt`, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(404).render("Error downloading file");
      } else {
        console.log("File downloaded successfully");
      }
    });
  });
  writeStream.end();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/example", exampleRouter);

app.use("/static-video", (req, res, next) => {
  const fileName = __dirname + "/public/videos/video.mp4";

  res.type("video/mp4");
  res.sendFile(fileName, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(404).render("Error sending file");
    } else {
      console.log("File sent successfully");
    }
  });
});

app.use("/stream-video", (req, res, next) => {
  const fileName = "./public/videos/video.mp4";

  res.writeHead(200, { "Content-Type": "video/mp4" });

  createReadStream(fileName).pipe(res);
});

app.use("/stream-range-video", async (req, res, next) => {
  const fileName = "./public/videos/video.mp4";
  const { size } = await fileInfo(fileName);
  const range = req.headers.range;

  if (range) {
    let [rangeStart, rangeEnd] = range.replace(/bytes=/, "").split("-");
    rangeStart = parseInt(rangeStart, 10);
    rangeEnd = rangeEnd ? parseInt(rangeEnd, 10) : size - 1;

    res.writeHead(206, {
      "Content-Type": "video/mp4",
      "Content-Length": rangeEnd - rangeStart + 1,
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${rangeStart}-${rangeEnd}/${size}`,
    });

    createReadStream(fileName, { start: rangeStart, end: rangeEnd }).pipe(res);
  } else {
    res.writeHead(200, { "Content-Type": "video/mp4", "Content-Length": size });

    createReadStream(fileName).pipe(res);
  }
});

app.use((req, res, next) => {
  let currentURL = req.originalUrl;
  if (currentURL === "/old-page") {
    return res.redirect(301, "/");
  }

  return next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
