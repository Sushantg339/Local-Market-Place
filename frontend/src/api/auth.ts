import type { signupPayload } from "../types/auth"
import api from "./axios"

export const sendOtpApi = (data: signupPayload)=>{
    return api.post("/auth/send-otp", data)
}

export const signupApi = ()=>{
    return api.post("/auth/signup", )
}