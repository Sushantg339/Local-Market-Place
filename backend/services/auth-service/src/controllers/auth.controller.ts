import type { RequestHandler } from "express";
import {z} from "zod";


import { AppError } from "../utils/appError.js";
import { generateOtp } from "../services/otp.service.js";
import type { ApiResponse } from "../types/res.type.js";
import { loginService, logoutService, refreshTokenService, signupService } from "../services/auth.service.js";
import { forgotPasswordOtpVerifyService, forgotPasswordService, resetPasswordService, updatePasswordService } from "../services/password.service.js";
import client from "../config/redis.config.js";


export const sendEmailController: RequestHandler = async(req , res)=>{
    try {
        const requiredBody = z.object({
            fullName: z.string(),
            password: z.string().min(8),
            email: z.email(),
            role: z.enum(["user", "worker", "admin"])
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            const message = parsed.error.issues
                .map(err => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            throw new AppError(400, message);
        }

        const {email} = parsed.data

        const mail = await generateOtp({email})

        res.status(201).json({
            success: true,
            message : "otp generated successfully",
            data: mail
        } as ApiResponse<typeof mail>)

    } catch (error: any) {
        console.log(error.message)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}

export const signupController: RequestHandler = async(req, res)=>{
    try {
        const requiredBody = z.object({
            fullName: z.string(),
            password: z.string().min(8),
            email: z.email(),
            role: z.enum(["user", "worker", "admin"]),
            otp: z.string().length(4)
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            const message = parsed.error.issues
                .map(err => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            throw new AppError(400, message);
        }

        const data = await signupService(parsed.data)

        res.cookie("refreshToken", data.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "none"
        })

        data.refreshToken = undefined

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            data
        } as ApiResponse<typeof data>)

    } catch (error: any) {
        console.log(error.message)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}

export const loginController: RequestHandler = async(req, res)=>{
    try {
        const requiredBody = z.object({
            password: z.string().min(8),
            email: z.email()
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            const message = parsed.error.issues
                .map(err => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            throw new AppError(400, message);
        }

        const userIP = req.ip
        const key = `${userIP}:request_count`
        const requestCount = await client.incr(key)

        if(requestCount == 1){
            await client.expire(key, 60)
        }

        if(requestCount > 10){
            throw new AppError(429, "Too many requests")
        }

        const data = await loginService(parsed.data)

        res.cookie("refreshToken", data.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "none"
        })

        data.refreshToken = undefined

        return res.status(200).json({
            message: "Login successfull!",
            success: true,
            data
        } as ApiResponse<typeof data>)
        
    } catch (error : any) {
        console.log(error.message)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}

export const forgotPasswordController: RequestHandler = async(req, res)=>{
    try {
        const requiredBody = z.object({
            email: z.email()
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            const message = parsed.error.issues
                .map(err => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            throw new AppError(400, message);
        }

        const data = await forgotPasswordService(parsed.data)

        return res.status(200).json({
            message: "Reset password otp sent successfully",
            success: true,
            data
        } as ApiResponse<typeof data>)

    } catch (error: any) {
        console.log(error.message)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}

export const forgotPasswordOtpVerifyController: RequestHandler = async(req, res)=>{
    try {
        const requiredBody = z.object({
            email: z.email(),
            otp: z.string().length(4)
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            const message = parsed.error.issues
                .map(err => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            throw new AppError(400, message);
        }

        const updatedUser = await forgotPasswordOtpVerifyService(parsed.data)

        return res.status(200).json({
            message: "Otp Verified Successfully!",
            success: true,
            data: updatedUser
        } as ApiResponse<typeof updatedUser>)
    } catch (error: any) {
        console.log(error.message)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}

export const resetPasswordController: RequestHandler = async(req, res)=>{
    try {
        const requiredBody = z.object({
            token: z.string(),
            password: z.string().min(8),
            confirmPassword: z.string().min(8)
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            const message = parsed.error.issues
                .map(err => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            throw new AppError(400, message);
        }

        const updatedUser = await resetPasswordService(parsed.data)

        return res.status(200).json({
            message: "Reset Password Successfully!",
            success: true,
            data: updatedUser
        } as ApiResponse<typeof updatedUser>)

    } catch (error: any) {
        console.log(error.message)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}


export const updatePasswordController: RequestHandler = async(req , res)=>{
    try {
        const userData = JSON.parse(req.headers["user"] as string)

        const userId = userData.id

        const requiredBody = z.object({
            oldPassword : z.string().min(8),
            newPassword: z.string().min(8)
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            const message = parsed.error.issues
                .map(err => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            throw new AppError(400, message);
        }

        const {oldPassword, newPassword} = parsed.data

        const data = await updatePasswordService({oldPassword, newPassword, userId})

        return res.status(200).json({
            message: "Password updated successfully!",
            success: true,
            data
        } as ApiResponse<typeof data>)

    } catch (error: any) {
        console.log(error.message)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}

export const refreshTokenController: RequestHandler = async(req, res)=>{
    try {
        const {refreshToken} = req.cookies

        if(!refreshToken){
            throw new AppError(401, "Refresh Token missing")
        }

        const tokens = await refreshTokenService({refreshToken})

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "none"
        })

        tokens.refreshToken = undefined

        return res.status(200).json({
            message: "Rotated Refresh Token",
            success : true,
            data: tokens
        } as ApiResponse<typeof tokens>)

    } catch (error: any) {
        console.log(error.message)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}

export const logoutController: RequestHandler = async(req , res)=>{
    try {
        const {refreshToken} = req.cookies

        if(!refreshToken){
            throw new AppError(401, "No refresh token provided")
        }

        await logoutService({refreshToken})
        res.clearCookie('refreshToken')

        return res.status(200).json({
            message: "Logout successfull",
            success: true,
            data: null
        } as ApiResponse<null>)
    } catch (error: any) {
        console.log(error.message)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}