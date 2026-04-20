import otp from "otp-generator"

import User from "../models/user.model.js"
import { AppError } from "../utils/appError.js"
import Otp, { type IOtp } from "../models/otp.model.js"
import axios from "axios"
import { mailtemplate } from "../templates/mail.template.js"

type Role = "user" | "worker" | "admin"

interface IUserData{
    fullName: string,
    email: string, 
    role: Role,
    password: string
}

export const generateOtp = async(data: IUserData)=>{
    const {fullName, email, password, role} = data

    const isUser = await User.findOne({email})

    if(isUser){
        throw new AppError(409, "User already exists")
    }

    const newOtp = otp.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })

    const otpDoc = await Otp.create({
        email,
        otp: newOtp
    })

    const mailData = {
        email: email,
        subject: "OTP Verification - Servora",
        body: mailtemplate(newOtp),
        from: "sushantg339@gmail.com"
    }

    const mail = await axios.post('http://localhost:3002/send-mail', mailData)

    return otpDoc
}