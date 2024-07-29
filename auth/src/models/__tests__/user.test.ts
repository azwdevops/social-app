import { User } from "../index";

it("should not save a user if email is already in database", async () => {
  const userInfo = {
    email: "email@email.com",
    password: "password1",
  };
  const newUser1 = await User.create(userInfo);
  expect(newUser1).toBeDefined();
  expect(newUser1.email).toEqual(userInfo.email);

  let err;

  try {
    await User.create(userInfo); // error
  } catch (e) {
    err = e;
  }
  expect(err).toBeDefined();
});
