import { Document, model, Schema, Types } from "mongoose";

export type UserRole = "SuperAdmin" | "Admin" | "Client" | "Prestataire";

// Définir TUser comme un type simple
export type TUser = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  role: UserRole;
};

export interface IUser extends TUser, Document {
  _id: Types.ObjectId;
}

const SUser = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["SuperAdmin", "Admin", "Client", "Prestataire"],
    default: "Client"
  }
});

const User = model<IUser>("users", SUser);
export default User;
