import express from "express"

import { forgotPasswordController,  forgotPasswordOtpVerifyController, loginController, logoutController, refreshTokenController, resetPasswordController, sendEmailController, signupController, updatePasswordController } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post('/send-otp', sendEmailController)
authRouter.post('/signup', signupController)
authRouter.post('/login', loginController)
authRouter.post('/logout', logoutController)

authRouter.post('/forgot-password', forgotPasswordController)
authRouter.put('/forgot-verify-otp', forgotPasswordOtpVerifyController)
authRouter.put('/reset-password', resetPasswordController)
authRouter.put('/update-password', updatePasswordController)

authRouter.post('/refresh-token', refreshTokenController)

export default authRouter