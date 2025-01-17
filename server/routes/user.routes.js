import {registerUser,loginUser, userCredits} from '../controllers/user.controller.js'
import express from 'express';
import userauth from '../middlewares/auth.js';

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/credits',userauth,userCredits)
// userRouter.post('/pay',userauth,paymentRazorpay)




export default userRouter;
