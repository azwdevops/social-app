import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { handleMethodNotAllowed } from "./utils";

export const SIGNUP_ROUTE = "/api/auth/signup";

const signUpRouter = express.Router();

signUpRouter.post(
  SIGNUP_ROUTE,
  [
    body("email").isEmail().withMessage("Email must be valid format"),
    body("password").trim().isLength({ min: 8, max: 15 }).withMessage("Password must be between 8 and 15 characters"),
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

signUpRouter.options(SIGNUP_ROUTE, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
  res.sendStatus(200);
});

signUpRouter.get(SIGNUP_ROUTE, handleMethodNotAllowed);
signUpRouter.put(SIGNUP_ROUTE, handleMethodNotAllowed);
signUpRouter.patch(SIGNUP_ROUTE, handleMethodNotAllowed);
signUpRouter.delete(SIGNUP_ROUTE, handleMethodNotAllowed);

export default signUpRouter;
