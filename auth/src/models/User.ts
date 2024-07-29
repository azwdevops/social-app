import { Document, model, Model, Schema } from "mongoose";

export type UserDocument = Document & {
  email: string;
  password: string;
};

export interface UserModel extends Model<UserDocument> {}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<UserDocument, UserModel>("user", UserSchema);

UserSchema.pre("save", async function preSaveFunction(this: UserDocument, next) {
  const existingUser = await User.findOne({ email: this.email });
  if (existingUser) {
    throw new Error("Email already in the database");
  }

  next();
});

export default User;
