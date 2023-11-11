import { Router } from 'express'
import { getAllUser, userSignUp } from '../controllers/user-controller.js';
import { signupValidator, validator } from '../utils/validator.js';

const userRouter = Router();

userRouter.get('/', getAllUser)
userRouter.post('/signup', validator(signupValidator), userSignUp)

export default userRouter;