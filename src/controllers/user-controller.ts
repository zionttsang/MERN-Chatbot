import { Request, Response, NextFunction } from "express";
import User from "../models/user.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-mgr.js";
import { COOKIE_NAME } from "../utils/constant.js";

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
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        const hashpwd = await hash(password, 10);
        const user = new User({ name, email, password: hashpwd });
        await user.save();

        // clean old and grant new token;
        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
        })

        const token = createToken(user.id.toString(), user.email, '7d');
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        })

        return res.status(201).json({ message: 'OK', email: user.email.toString() })
    } catch (err) {
        console.log(err, '\nCan not find user(s)')
        return res.status(500).json({ message: 'Internal Server Error', cause: err })
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    // get all users from DB;
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' })
        }
        const match = await compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Password is incorrect' })
        }

        // clean old and grant new token;
        res.clearCookie(COOKIE_NAME, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
        })

        const token = createToken(user.id.toString(), user.email, '7d');
        res.cookie(COOKIE_NAME, token, {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        })

        return res.status(200).json({ message: 'OK', id: user.id.toString() })
    } catch (err) {
        console.log(err, '\nCan not find user(s)')
        return res.status(500).json({ message: 'Internal Server Error', cause: err })
    }
}