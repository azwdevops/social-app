import app from "@/app";
import request from "supertest";
import { SIGNUP_ROUTE } from "@/routes/signup";

console.clear(); // to ensure we only get the latest issues, we clear our console

/**
 * available HTTP methods inSIGNUP_ROUTE * - POST
 */

describe("test signup route method availability", () => {
  let email = "";
  let password = "";
  beforeAll(() => {
    email = "email@email.com";
    password = "password1";
  });

  it("should return 405 for GET, PUT, PATCH , DELETE methods", async () => {
    await request(app).get(SIGNUP_ROUTE).send({ email, password }).expect(405);
    await request(app).put(SIGNUP_ROUTE).send({ email, password }).expect(405);
    await request(app).patch(SIGNUP_ROUTE).send({ email, password }).expect(405);
    await request(app).delete(SIGNUP_ROUTE).send({ email, password }).expect(405);
  });

  it("should return 200 for POST & OPTIONS requests", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password }).expect(200);
    await request(app).options(SIGNUP_ROUTE).expect(200);
  });

  it("should return POST as the only allowed method from an OPTIONS request", async () => {
    const response = await request(app).options(SIGNUP_ROUTE).expect(200);
    expect(response.get("access-control-allow-methods")).toContain("POST");
    expect(response.get("access-control-allow-methods")).toContain("OPTIONS");
  });
});

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
    await request(app).post(SIGNUP_ROUTE).send({ email: "email test" }).expect(422);
  });

  it("should return 200 if email is valid", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email: "email@email.com", password }).expect(200);
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
    await request(app).post(SIGNUP_ROUTE).send({ email, password: "pass1" }).expect(422);
  });

  it("should return 422 if password is more than 15 characters", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: "verylongpassword100" }).expect(422);
  });

  it("should return 422 if password does not contain 1 number", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: "Password" }).expect(422);
  });

  it("should return 422 if password does not contain a lowercase letter", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: "PASSWORD1" }).expect(422);
  });

  it("should return 200 if password is valid", async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email, password: "password1" }).expect(200);
  });
});
