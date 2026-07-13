import otp from "otp-generator"


import User from "../models/user.model.js"
import { AppError } from "../utils/appError.js"
import { registerMailTemplate } from "../templates/mail.template.js"
import client from "../config/redis.config.js"
import { sendOtpMessage } from "../producers/otpProducer.js"


interface IUserData{
    email: string,
}

const MAIL_SERVICE_URL = process.env.MAIL_SERVICE_URL

export const generateOtp = async(data: IUserData)=>{
    const { email } = data

    const isUser = await User.findOne({email})

    if(isUser){
        throw new AppError(409, "User already exists")
    }

    const newOtp = otp.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })


    await client.set(`signup_otp:${email}`, newOtp, {
        EX: 300
    })

    const mailData = {
        email: email,
        subject: "OTP Verification - Servora",
        body: registerMailTemplate(newOtp),
        from: "sushantg339@gmail.com"
    }

    const isSent = sendOtpMessage(mailData)

    return isSent
}