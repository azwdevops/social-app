import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const SIGNUP_ROUTE = "/api/auth/signup";

const signUpRouter = express.Router();

signUpRouter.post(
  SIGNUP_ROUTE,
  [
    body("email").isEmail().withMessage("Email must be valid format"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 15 })
      .withMessage("Password must be between 8 and 15 characters"),
    body("password")
      .matches(/^(.*[a-z].*)$/)
      .withMessage("Password must contain a lowercase letter"),
    body("password")
      .matches(/^(.*\d.*)$/)
      .withMessage("Password must contain a number"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({});
    }

    return res.status(200).send({});
  }
);

signUpRouter.all(SIGNUP_ROUTE, (req, res) => {
  return res.status(405).send({});
});

export default signUpRouter;
