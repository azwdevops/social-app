import express from "express";

const app = express();

app.get("/", async (req, res) => {
  res.send({});
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
