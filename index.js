const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 8000;
const db = require("./config/Database");
const router = require("./routes/route");

dotenv.config();

try {
  db.authenticate();
  console.log("database connected");
} catch (error) {
  console.error(error);
}

app.use(express.json());
app.use(router);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => console.log(`server running on port : ${port}`));
