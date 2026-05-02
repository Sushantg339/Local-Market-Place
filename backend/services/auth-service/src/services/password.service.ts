import crypto from "node:crypto"
import bcrypt from "bcrypt"
import otpGenerator from "otp-generator"
import axios from "axios"


import User from "../models/user.model.js"
import { AppError } from "../utils/appError.js"
import { forgotPasswordMailTemplate, updatePasswordTemplate } from "../templates/mail.template.js"
import client from "../config/redis.config.js"


interface IForgotPasswordData{
    email: string
}

interface IForgotPasswordOtpVerifyData{
    email: string,
    otp: string
}

interface IResetpasswordData{
    token: string,
    password: string,
    confirmPassword: string
}

interface IUpdatePasswordData{
    userId: string,
    oldPassword: string,
    newPassword: string
}

export const forgotPasswordService = async(data: IForgotPasswordData)=>{
    const {email} = data

    const user = await User.findOne({email})

    if(!user){
        throw new AppError(404, "User not found!")
    }

    const otp = await otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })

    await client.set(`forgot_otp:${email}`, otp, {
        EX: 300
    })

    const mailData = {
        email: email,
        subject: "Forgot Password Otp Verification - Servora",
        body: forgotPasswordMailTemplate(otp),
        from: "sushantg339@gmail.com"
    }

    const mail = await axios.post('http://localhost:3002/send-mail', mailData)

    return mail.data
}

export const forgotPasswordOtpVerifyService = async(data: IForgotPasswordOtpVerifyData)=>{
    const {email, otp} = data

    const savedOtp = await client.get(`forgot_otp:${email}`)

    if(!savedOtp){
        throw new AppError(404, "Otp not found or exipred!")
    }

    if(savedOtp !== otp){
        throw new AppError(422, "Otp not matched")
    }

    const token = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    const updatedUser = await User.findOneAndUpdate({email}, {
        resetToken: hashedToken,
        resetTokenExpiry: Date.now() + 10*60*1000
    }, { returnDocument: 'after' }).select("-password -__v -createdAt -updatedAt")

    return {user: updatedUser, token}
}

export const resetPasswordService = async(data: IResetpasswordData)=>{
    const {token, password, confirmPassword} = data

    if(password !== confirmPassword){
        throw new AppError(422, "Password and confirmPassword not matched")
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await User.findOne({resetToken: hashedToken})

    if(!user){
        throw new AppError(404, "User not found!")
    }

    if(user.resetTokenExpiry! < new Date()){
        throw new AppError(422, "Reset token expired!")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword

    user.resetToken = undefined
    user.resetTokenExpiry = undefined

    await user.save()

    return {
        _id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName
    }
}


export const updatePasswordService = async(data: IUpdatePasswordData)=>{
    const {userId, oldPassword, newPassword} = data

    const user = await User.findById(userId)

    if(!user){
        throw new AppError(404, "User does not exist!")
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if(!isPasswordValid){
        throw new AppError(422 , "Invalid password!")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    await user.save()

    const mailData = {
        email: user.email,
        subject: "Password Updated Successfully - Servora",
        body: updatePasswordTemplate(user.fullName),
        from: "sushantg339@gmail.com"
    }

    const mail = await axios.post('http://localhost:3002/send-mail', mailData)

    return {
        _id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName
    }
}