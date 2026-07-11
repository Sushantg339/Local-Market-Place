import type { loginPayload, signupPayload, verifyOtpPayload } from "../types/auth"
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