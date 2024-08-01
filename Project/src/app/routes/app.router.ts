import { IRouter, Router } from 'express';
import userRouter from './user.router';
const appRouter:IRouter=Router();
appRouter.use('/user',userRouter);
appRouter.route('/').get((req, res) => {
    res.send('API is running');
})
export default appRouter