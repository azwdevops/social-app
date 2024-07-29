import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const SIGNUP_ROUTE = "/api/auth/signup";

const signUpRouter = express.Router();

signUpRouter.post(
  SIGNUP_ROUTE,
  [
    body("email").isEmail().withMessage("Email must be valid format").normalizeEmail(),
    body("password").trim().isLength({ min: 8, max: 15 }).withMessage("Password must be between 8 and 15 characters"),
    body("password")
      .matches(/^(.*[a-z].*)$/)
      .withMessage("Password must contain a lowercase letter"),
    body("password")
      .matches(/^(.*\d.*)$/)
      .withMessage("Password must contain a number"),
    body("password").escape(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({});
    }

    if (/.+@[A-Z]/g.test(req.body.email)) {
      return res.sendStatus(422);
    }

    if (/[><'"/]/g.test(req.body.password)) {
      return res.sendStatus(422);
    }

    return res.status(200).send({ email: req.body.email });
  }
);

export default signUpRouter;
