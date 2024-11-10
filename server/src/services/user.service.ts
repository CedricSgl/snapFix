import { ValidationError } from "express-validator";
import User, { TUser } from "../models/user.model";
import { Pagination } from "../types/Pagination";
import { Sort } from "../types/Sort";

type UserUpdate = Partial<{
    firstName: string;
    lastName: string;
    emailAddress: string;
}>;

const DEFAULT_SIZE = 10;
const DEFAULT_PAGE = 1;

async function getAll(pagination: Pagination, sort: Sort | null) {
    try {
        const start = pagination.start || DEFAULT_PAGE;
        const size = pagination.size || DEFAULT_SIZE;
        if(sort) {
            return await User.find().sort({[`${sort?.id}`]: sort?.desc ? "desc" : "asc"}).skip(start).limit(size);    
        }
        return await User.find().skip(start).limit(size);
    } catch (err: any) {
        throw new Error("Server error");
    }
}

async function get(id: string) {
    try {
        return await User.findById(id);
    } catch (err: any) {
        throw new Error("Server error");
    }
}

async function create(user: TUser): Promise<TUser | ValidationError> {
    try {
        const userToSave = new User(user);

        return await userToSave.save();
    } catch (err: any) {
        /* if (err.errmsg.includes("duplicate key error collection")) {
            return {
                type: 'field',
                path: 'emailAddress',
                msg: "Duplicate object",
                location: 'body'
            }
        } */
        console.log(err)
        throw new Error("Server error");
    }
}

async function update(id: string, user: UserUpdate) {
    try {
        const updates: UserUpdate = user;

        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true,        // Retourne l'utilisateur mis à jour
            runValidators: true, // Exécute les validateurs Mongoose
        });
    } catch (err: any) {
        if (err.errmsg.includes("duplicate key error collection")) {
            return {
                error: 400,
                message: "Duplicate object"
            }
        }
        console.log(err)
        throw new Error("Server error");
    }
}

async function remove(id: string) {
    try {
        await User.findByIdAndDelete({ _id: id });
    } catch (err: any) {
        throw new Error("Server error");
    }
}

function count() {
    return User.countDocuments()
}

export { getAll, get, create, update, remove, count };
