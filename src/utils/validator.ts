import { Request, Response, NextFunction } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const validator = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return res.status(422).json({ error: errors.array() })
    }
}

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Must be email pattern."),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should be longer than 6 digits."),
]
export const signupValidator = [
    body("name").notEmpty().withMessage("Name can NOT be empty."),
    ...loginValidator,
]