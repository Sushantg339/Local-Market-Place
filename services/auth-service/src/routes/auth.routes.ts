import express from "express"

import { forgotPasswordController, forgotPasswordOtpVerify, loginController, resetPassword, sendEmailController, signupController, updatePassword } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post('/send-otp', sendEmailController)
authRouter.post('/signup', signupController)
authRouter.post('/login', loginController)
authRouter.post('/forgot-password', forgotPasswordController)
authRouter.put('/forgot-verify-otp', forgotPasswordOtpVerify)
authRouter.put('/reset-password', resetPassword)
authRouter.put('/update-password', updatePassword)

export default authRouter