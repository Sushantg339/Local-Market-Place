import type { RequestHandler } from "express";
import {success, z} from "zod";
import { AppError } from "../utils/appError.js";
import type { ApiResponse } from "../types/response.type.js";
import { sendMailService } from "../services/mail.services.js";

export interface IMailData{
    email: string,
    subject: string,
    body: string,
    from: string
}

export const sendMail: RequestHandler = async(req , res)=>{
    try {
        const requiredBody = z.object({
            email: z.email(),
            subject: z.string(),
            body: z.string(),
            from : z.email()
        })

        const parsed = requiredBody.safeParse(req.body)

        if(!parsed.success){
            throw new AppError(400, parsed.error.message)
        }

        const mail = sendMailService(parsed.data)

        res.status(200).json({
            success: true,
            message: "Otp sent successfully",
            data: null
        } as ApiResponse<null>)
    } catch (error: any) {
        console.log(error.message)
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal server error"
        } as ApiResponse<null>)
    }
}