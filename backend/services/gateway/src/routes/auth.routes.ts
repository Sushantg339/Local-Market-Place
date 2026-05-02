import express from "express"
import proxy from "express-http-proxy"


import { authMiddleware } from "../middlewares/auth.middleware.js"

const authRouter = express.Router()

const authProxy = proxy("http://localhost:3001", {
    proxyReqPathResolver:(req)=>{
        return req.originalUrl.replace("/api/v1/auth", "")
    },

    proxyReqOptDecorator:(proxyReqOpt, srcReq)=>{
        if(srcReq.user){
            proxyReqOpt.headers["user"] = JSON.stringify(srcReq.user)
        }

        return proxyReqOpt
    }
})

authRouter.use("/send-otp", authProxy)
authRouter.use("/signup", authProxy)
authRouter.use("/login", authProxy)
authRouter.use("/forgot-password", authProxy)
authRouter.use("/forgot-verify-otp", authProxy)
authRouter.use("/send-otp", authProxy)
authRouter.use("/reset-password", authProxy)
authRouter.use("/update-password", authMiddleware, authProxy)
authRouter.use("/refresh-token", authProxy)
authRouter.use("/logout", authProxy)


export default authRouter