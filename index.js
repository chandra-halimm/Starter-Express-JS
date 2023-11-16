const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/Database");

try {
  db.authenticate();
  console.log("database connected");
} catch (error) {
  console.error(error);
}

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => console.log(`server running on port : ${port}`));
