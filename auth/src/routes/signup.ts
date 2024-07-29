import { InvalidInput } from "@/errors/invalid-input";
import { User } from "@/models";
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
      throw new InvalidInput();
      // return res.status(422).send({});
    }

    if (/.+@[A-Z]/g.test(req.body.email)) {
      return res.sendStatus(422);
    }

    if (/[><'"/]/g.test(req.body.password)) {
      return res.sendStatus(422);
    }

    const { email, password } = req.body;
    try {
      const newUser = await User.create({ email, password });

      return res.status(201).send({ email: newUser.email });
    } catch (error) {
      return res.sendStatus(422);
    }
  }
);

export default signUpRouter;
