import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const signUprouter = express.Router();

signUprouter.post(
  "/api/auth/signup",
  [body("email").isEmail().withMessage("Email must be valid format")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({});
    }

    return res.status(200).send({});
  }
);

export default signUprouter;
