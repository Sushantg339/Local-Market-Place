import express from "express"
import { loginController, sendEmailController, signupController } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post('/send-otp', sendEmailController)
authRouter.post('/signup', signupController)
authRouter.post('/login', loginController)

export default authRouter