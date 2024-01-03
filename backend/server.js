const express = require("express");

const app = express();

const PORT = process.env.PORT || 1000;

app.get("/", (req, res) => {
  res.send(`Server listening on ${PORT}`);
});

app.get("/messages", (req, res) => {
  res.send(`Hello Einstein`);
});

app.post("/messages", (req, res) => {
  res.send(`Hello Einstein`);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
