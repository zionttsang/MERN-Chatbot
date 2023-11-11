import { Router } from 'express'
import { getAllUser, userLogin, userSignUp } from '../controllers/user-controller.js';
import { loginValidator, signupValidator, validator } from '../utils/validator.js';

const userRouter = Router();

userRouter.get('/', getAllUser)
userRouter.post('/signup', validator(signupValidator), userSignUp)
userRouter.post('/login', validator(loginValidator), userLogin)

export default userRouter;