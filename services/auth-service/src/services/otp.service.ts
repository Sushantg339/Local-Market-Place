import otp from "otp-generator"
import axios from "axios"


import User from "../models/user.model.js"
import { AppError } from "../utils/appError.js"
import Otp from "../models/otp.model.js"
import { registerMailTemplate } from "../templates/mail.template.js"


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

    await Otp.deleteMany({email})

    const otpDoc = await Otp.create({
        email,
        otp: newOtp
    })

    const mailData = {
        email: email,
        subject: "OTP Verification - Servora",
        body: registerMailTemplate(newOtp),
        from: "sushantg339@gmail.com"
    }

    const mail = await axios.post('http://localhost:3002/send-mail', mailData)

    return {
        _id: otpDoc._id, 
        email: otpDoc.email
    }
}