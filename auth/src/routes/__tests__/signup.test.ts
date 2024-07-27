import app from "@/app";
import request from "supertest";

console.clear(); // to ensure we only get the latest issues, we clear our console
// it("should return 405 for non-post requests to the signup route", async () => {
//   await request(app).get("/signup").expect(405);
// });

it("should return 422 if the email is not valid", async () => {
  await request(app).post("/api/auth/signup").send({}).expect(422);
  await request(app)
    .post("/api/auth/signup")
    .send({ email: "email test" })
    .expect(422);
});
