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

export default User;
