import { Router } from 'express'
import userRouter from './user-router.js';
import chatRouter from './chat-router.js';

const appRouter = Router();

appRouter.use('/user', userRouter) //domin/apu/v1/user
appRouter.use('/chat', chatRouter) //domin/api/v1/chat

export default appRouter;