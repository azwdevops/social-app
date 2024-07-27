import express from "express";
import routes from "@/routes";

const { signUprouter } = routes;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(signUprouter);

export default app;
