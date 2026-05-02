import bcrypt from "bcrypt"
import jwt, { type JwtPayload } from "jsonwebtoken"

import User from "../models/user.model.js"
import { AppError } from "../utils/appError.js"
import client from "../config/redis.config.js"


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

interface IRefreshTokenData{
    refreshToken: string
}

interface ILogoutData{
    refreshToken: string
}

const ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET 

if(!ACCESS_JWT_SECRET){
    throw new AppError(404, "JWT secret not found")
}

const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET 

if(!REFRESH_JWT_SECRET){
    throw new AppError(404, "JWT secret not found")
}

export const signupService = async(data: ISignupData)=>{
    const {fullName, email, password, role, otp} = data

    const isUser = await User.findOne({email})

    if(isUser){
        throw new AppError(409, "User already exists!")
    }

    const savedOtp = await client.get(`signup_otp:${email}`);

    if(!savedOtp){
        throw new AppError(404, "Otp not found")
    }

    if(savedOtp !== otp){
        throw new AppError(401, "Otp not valid! try again")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        email, 
        fullName, 
        role, 
        password: hashedPassword
    })

    const accessToken = jwt.sign({
        id: user._id, 
        role, 
        fullName, 
        email
    }, ACCESS_JWT_SECRET, {expiresIn: "15min"})

    const refreshToken = jwt.sign({
        id: user._id, 
    }, REFRESH_JWT_SECRET, {expiresIn: "7d"})

    await client.set(`session:${user._id}`, refreshToken, {
        EX : 7*24*60*60
    })

    return {
        user:{
            _id: user._id,
            fullName: user.fullName,
            role: user.role,
            email: user.email
        }, 
        accessToken,
        refreshToken: refreshToken || undefined
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
        throw new AppError(422, "Invalid Credentials")
    }

    const accessToken = jwt.sign({
        id: user._id, 
        role: user.role, 
        fullName: user.fullName, 
        email: user.email
    }, ACCESS_JWT_SECRET, {expiresIn: "15min"})

    const refreshToken = jwt.sign({
        id: user._id, 
    }, REFRESH_JWT_SECRET, {expiresIn: "7d"})

    await client.set(`session:${user._id}`, refreshToken, {
        EX : 7*24*60*60
    })


    return {
        user:{
            _id: user._id,
            fullName: user.fullName,
            role: user.role,
            email: user.email
        },
        accessToken,
        refreshToken: refreshToken || undefined
    }
}


export const refreshTokenService = async(data: IRefreshTokenData)=>{
    const {refreshToken} = data

    let decoded: JwtPayload

    try{
        decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET) as JwtPayload
    }catch{
        throw new AppError(401, "Invalid or expired refresh token")
    }

    const userId = decoded.id

    const redisStoredToken = await client.get(`session:${userId}`)

    if(!redisStoredToken || redisStoredToken !== refreshToken){
        throw new AppError(403, "Session expired or invalid token")
    }

    const user = await User.findById(userId)

    if(!user){
        throw new AppError(404, "user not found")
    }

    const accessToken = jwt.sign({
        id: user._id, 
        role: user.role, 
        fullName: user.fullName, 
        email: user.email
    }, ACCESS_JWT_SECRET, {expiresIn: "15min"})

    const newRefreshToken = jwt.sign({
        id: user._id, 
    }, REFRESH_JWT_SECRET, {expiresIn: "7d"})

    await client.set(`session:${user._id}`, newRefreshToken, {
        EX : 7*24*60*60
    })

    return {
        accessToken, 
        refreshToken: newRefreshToken || undefined
    }
}

export const logoutService = async(data: ILogoutData)=>{
    const {refreshToken} = data

    let decoded: JwtPayload

    try{
        decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET) as JwtPayload
    }catch{
        throw new AppError(401, "Invalid or expired refresh token")
    }

    const userId = decoded.id

    await client.del(`session:${userId}`)
    await client.set(`blacklist:${userId}`, "true", {
        EX : 7*24*60*60
    })
}