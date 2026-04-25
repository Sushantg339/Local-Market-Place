import type { RequestHandler } from "express";
import {z} from "zod";


import { AppError } from "../utils/appError.js";
import { generateOtp } from "../services/otp.service.js";
import type { ApiResponse } from "../types/res.type.js";
import { loginService, signupService } from "../services/auth.service.js";
import User from "../models/user.model.js";


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
            throw new AppError(400, parsed.error.message)
        }

        const {email} = parsed.data

        const newOtp = await generateOtp({email})

        res.status(201).json({
            success: true,
            message : "otp generated successfully",
            data: newOtp
        } as ApiResponse<typeof newOtp>)

    } catch (error: any) {
        console.log(error)
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
            throw new AppError(400, parsed.error.message)
        }

        const data = await signupService(parsed.data)

        res.cookie("token", data.token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "none"
        })

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            data
        } as ApiResponse<typeof data>)

    } catch (error: any) {
        console.log(error)
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
            throw new AppError(400, parsed.error.message)
        }

        const data = await loginService(parsed.data)

        res.cookie("token", data.token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "none"
        })

        return res.status(200).json({
            message: "Login successfull!",
            success: true,
            data
        } as ApiResponse<typeof data>)
        
    } catch (error : any) {
        console.log(error)
        return res.status(error.statusCode || 500).json({
            success: false,
            message : error.message || "Internal server error",
            data: null
        })
    }
}