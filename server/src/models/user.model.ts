import { Document, model, Schema } from "mongoose";

export type TUser = {
    firstName: string,
    lastName: string,
    emailAddress: string,
}

export interface IUser extends TUser, Document {};

const SUser : Schema = new Schema({
    firstName: {
        type: String,
        required:true,
        unique: false
    },
    lastName: {
        type: String,
        required:true,
        unique: false
    },
    emailAddress: {
        type: String,
        required:true,
        unique: true
    }
})

const User = model<IUser>("users", SUser);

export default User;