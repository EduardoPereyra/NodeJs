import https from "https";

const req = https.get(
  "https://en.wikipedia.org/w/api.php?action=help&format=json",
  (res) => {
    res.on("data", (chunk) => {
      console.log("Received chunk of data");
    });

    res.on("end", () => {
      console.log("Response ended");
    });
  }
);
req.on("socket", (socket) => {
  console.log("Socket connected");
});
req.on("error", (res) => {
  console.log("Error in request");
});
