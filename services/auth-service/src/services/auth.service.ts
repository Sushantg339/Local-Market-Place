import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import Otp from "../models/otp.model.js"
import User from "../models/user.model.js"
import { AppError } from "../utils/appError.js"


type Role = "user" | "worker" | "admin"

interface ISignupData{
    fullName: string,
    password: string,
    email: string,
    role: Role,
    otp: string
}

interface ILoginData{
    email: string,
    password: string
}

const JWT_SECRET = process.env.JWT_SECRET 

if(!JWT_SECRET){
    throw new AppError(404, "JWT secret not found")
}

export const signupService = async(data: ISignupData)=>{
    const {fullName, email, password, role, otp} = data

    const isUser = await User.findOne({email})

    if(isUser){
        throw new AppError(409, "User already exists!")
    }

    const savedOtp = await Otp.findOne({email});

    if(!savedOtp){
        throw new AppError(404, "Otp not found")
    }

    if(savedOtp.otp !== otp){
        throw new AppError(401, "Otp not valid! try again")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        email, 
        fullName, 
        role, 
        password: hashedPassword
    })

    const token = jwt.sign({id: user._id, role, fullName, email}, JWT_SECRET, {expiresIn: "7d"})

    return {
        user:{
            _id: user._id,
            fullName: user.fullName,
            role: user.role,
            email: user.email
        }, 
        token
    }
}

export const loginService = async(data: ILoginData)=>{
    const {email, password} = data

    const user = await User.findOne({email})

    if(!user){
        throw new AppError(400, "Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        throw new AppError(400, "Invalid Credentials")
    }

    const token = jwt.sign({
        id: user._id, 
        role: user.role, 
        fullName: user.fullName, 
        email: user.email
    }, JWT_SECRET, {expiresIn: "7d"})

    return {
        user:{
            _id: user._id,
            fullName: user.fullName,
            role: user.role,
            email: user.email
        },
        token
    }
}