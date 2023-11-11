import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { hash } from "bcrypt";

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    // get all users from DB;
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'OK', users })
    } catch (err) {
        console.log(err, '\nCan not find user(s)')
        return res.status(500).json({ message: 'Internal Server Error', cause: err })
    }
}

export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    // get all users from DB;
    try {
        const { name, email, password } = req.body;
        const hashpwd = await hash(password, 10);
        const user = new User({ name, email, password: hashpwd });
        await user.save();
        return res.status(200).json({ message: 'OK', email: user.email.toString() })
    } catch (err) {
        console.log(err, '\nCan not find user(s)')
        return res.status(500).json({ message: 'Internal Server Error', cause: err })
    }
}