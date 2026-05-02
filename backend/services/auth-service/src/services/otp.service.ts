import otp from "otp-generator"
import axios from "axios"


import User from "../models/user.model.js"
import { AppError } from "../utils/appError.js"
import { registerMailTemplate } from "../templates/mail.template.js"
import client from "../config/redis.config.js"


interface IUserData{
    email: string,
}

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

    const mail = await axios.post('http://localhost:3002/send-mail', mailData)

    return mail.data
}