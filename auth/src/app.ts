import express from "express";
import { signUprouter } from "@/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(signUprouter);

export default app;
