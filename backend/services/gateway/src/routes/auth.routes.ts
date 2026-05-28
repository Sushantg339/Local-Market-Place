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
    },

    proxyErrorHandler: (err, res, next)=>{
        console.log("Proxy Error : ", {...err})
        res.status(500).json({
            success: false,
            message: "Auth service unavailable"
        })
    }
})

authRouter.use("/update-password", authMiddleware, authProxy)
authRouter.use("/", authProxy)


export default authRouter