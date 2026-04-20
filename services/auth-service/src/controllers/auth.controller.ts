import type { RequestHandler } from "express";
import {z} from "zod";


import { AppError } from "../utils/appError.js";
import { generateOtp } from "../services/auth.service.js";
import type { ApiResponse } from "../types/res.type.js";


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

        const newOtp = await generateOtp(parsed.data)

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