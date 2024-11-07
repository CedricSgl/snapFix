import User, { TUser } from "../models/user";

type UserUpdate = Partial<{
    firstName: string;
    lastName: string;
    emailAddress: string;
  }>;

export async function listUsers() {
    try {
        return await User.find();
    } catch (err: any) {
        throw new Error("Server error");
    }
}

export async function getUser(id: string) {
    try {
        return await User.findById(id);
    } catch (err: any) {
        throw new Error("Server error");
    }
}

export async function createUser(user: TUser) {
    try {
        const userToSave = new User(user);

        await userToSave.save();
    } catch (err: any) {
        if(err.errmsg.includes("duplicate key error collection")) {
            return {
                error: 400,
                message: "Duplicate object"
            }
        }
        console.log(err)
        throw new Error("Server error");
    }
}

export async function updateUser(id: string, user: UserUpdate) {
    try {
        const updates: UserUpdate = user;

        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true,        // Retourne l'utilisateur mis à jour
            runValidators: true, // Exécute les validateurs Mongoose
          });
    } catch (err: any) {
        if(err.errmsg.includes("duplicate key error collection")) {
            return {
                error: 400,
                message: "Duplicate object"
            }
        }
        console.log(err)
        throw new Error("Server error");
    }
}

export async function deleteUser(id: string) {
    try {
        await User.deleteOne({ _id: id });
    } catch (err: any) {
        throw new Error("Server error");
    }
}