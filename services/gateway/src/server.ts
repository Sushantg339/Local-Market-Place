import "dotenv/config"

import express from "express"
import proxy from "express-http-proxy"
import { authMiddleware } from "./middlewares/auth.middleware.js"


const PORT = process.env.PORT || 5000

const app = express()

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

app.use("/api/v1/auth/send-otp", authProxy)
app.use("/api/v1/auth/signup", authProxy)
app.use("/api/v1/auth/login", authProxy)
app.use("/api/v1/auth/forgot-password", authProxy)
app.use("/api/v1/auth/forgot-verify-otp", authProxy)
app.use("/api/v1/auth/send-otp", authProxy)
app.use("/api/v1/auth/reset-password", authProxy)
app.use("/api/v1/auth/update-password", authMiddleware, authProxy)

app.listen(PORT, ()=>{
    console.log(`gateway running on port ${PORT}`)
})