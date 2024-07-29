import app from "@/app";
import request from "supertest";
import { SIGNUP_ROUTE } from "@/routes/signup";
import { User } from "@/models";

console.clear(); // to ensure we only get the latest issues, we clear our console

/**
 * valid email conditions
 * - standard email formats from express-validator package
 */
describe("test validity of email input", () => {
  let password = "";
  beforeAll(() => {
    password = "Password1";
  });

  it("should return 422 if email is not provided", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ password }).expect(422);
  });

  it("should return 422 if the email is not valid", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ password }).expect(422);
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email: "email test" })
      .expect(422);
  });

  it("should return 201 if email is valid", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email: "email@email.com", password })
      .expect(201);
  });
});

/**
 * valid password conditions
 * at least 8 characters
 * at most 15 characters
 * at least one number
 * at least one letter
 *
 */

describe("test validity of password input", () => {
  let email = "";
  beforeAll(() => {
    email = "email@email.com";
  });

  it("Should return 422 if password is not provided", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email }).expect(422);
  });

  it("should return 422 if password contains less than 8 characters", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: "pass1" })
      .expect(422);
  });

  it("should return 422 if password is more than 15 characters", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: "verylongpassword100" })
      .expect(422);
  });

  it("should return 422 if password does not contain 1 number", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: "Password" })
      .expect(422);
  });

  it("should return 422 if password does not contain a lowercase letter", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: "PASSWORD1" })
      .expect(422);
  });

  it("should return 201 if password is valid", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: "password1" })
      .expect(201);
  });
});

describe("tets sanitization of email input", () => {
  it("should not contain uppercase letters in the domain of email", async () => {
    const normalizedEmail = "email@email.com";
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email: "email@EMAIL.COM", password: "password1" })
      .expect(201);
    expect(response.body.email).toEqual(normalizedEmail);
  });
});

describe("test sanitization of password input", () => {
  it("should not contain unescaped characters", async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email: "email@email.com", password: "password1<" })
      .expect(201);
  });
});

describe("tests saving the signed up user to the database", () => {
  const validUserInfo = {
    email: "email@email.com",
    password: "password1",
  };
  it("saves the user successfully as long as the information is valid", async () => {
    const response = await request(app)
      .post(SIGNUP_ROUTE)
      .send(validUserInfo)
      .expect(201);
    const user = await User.findOne({ email: response.body.email });
    const userEmail = user ? user.email : "";

    expect(user).toBeDefined();
    expect(userEmail).toEqual(validUserInfo.email);
  });

  it("does not allow saving a user with a duplicate email", async () => {
    await request(app).post(SIGNUP_ROUTE).send(validUserInfo).expect(201);
    await request(app).post(SIGNUP_ROUTE).send(validUserInfo).expect(422);
  });
});
