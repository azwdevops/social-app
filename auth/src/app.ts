import express from "express";

const app = express();

app.get("/", async (req, res) => {
  res.status(200).send({});
});

export default app;
