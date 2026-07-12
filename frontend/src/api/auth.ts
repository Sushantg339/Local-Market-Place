import type { forgotPasswordPayload, loginPayload, resetPasswordPayload, signupPayload, verifyForgotOtpPayload, verifyOtpPayload } from "../types/auth"
import api from "./axios"

export const sendOtpApi = (data: signupPayload)=>{
    return api.post("/auth/send-otp", data)
}

export const signupApi = (data: verifyOtpPayload)=>{
    return api.post("/auth/signup", data)
}

export const loginApi = (data: loginPayload)=>{
    return api.post("/auth/login", data)
}

export const forgotPasswordApi = (data: forgotPasswordPayload)=>{
    return api.post('/auth/forgot-password', data)
}

export const verifyForgotApi = (data: verifyForgotOtpPayload)=>{
    return api.put('/auth/forgot-verify-otp', data)
}

export const resetPasswordApi = (data: resetPasswordPayload)=>{
    return api.put('/auth/reset-password', data)
}