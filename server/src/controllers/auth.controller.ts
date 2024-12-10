// server/src/controllers/auth.controller.ts
import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import HttpStatusCodes from "http-status-codes";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'defaultAccessSecret';

function generateAccessToken(user: { _id: string; role: string; emailAddress: string }) {
  return sign(
    { userId: user._id, role: user.role, email: user.emailAddress },
    accessTokenSecret,
    { expiresIn: '1h' }
  );
}

export async function register(req: Request, res: Response) {
  try {
    const { firstName, lastName, emailAddress, password, role } = req.body;
    if (!firstName || !lastName || !emailAddress || !password || !role) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Champs manquants' });
    }

    const userExist = await User.findOne({ emailAddress });
    if (userExist) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Cet utilisateur existe déjà' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserDoc = await User.create({
      firstName,
      lastName,
      emailAddress,
      password: hashedPassword,
      role
    });
    
    // On sait que newUserDoc est un IUser, on peut le caster
    const newUser = newUserDoc as IUser;

    const token = generateAccessToken({
      _id: newUser._id.toString(),
      role: newUser.role,
      emailAddress: newUser.emailAddress
    });

    return res.status(HttpStatusCodes.CREATED).json({
      message: 'Utilisateur créé',
      token,
      user: { emailAddress: newUser.emailAddress, role: newUser.role }
    });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { emailAddress, password } = req.body;
    if (!emailAddress || !password) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Champs manquants' });
    }

    const foundUser = await User.findOne({ emailAddress });
    if (!foundUser) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Identifiants invalides' });
    }

    const user = foundUser as IUser;

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Identifiants invalides' });
    }

    const token = generateAccessToken({
      _id: user._id.toString(),
      role: user.role,
      emailAddress: user.emailAddress
    });

    return res.json({ token, user: { emailAddress: user.emailAddress, role: user.role } });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erreur serveur' });
  }
}
