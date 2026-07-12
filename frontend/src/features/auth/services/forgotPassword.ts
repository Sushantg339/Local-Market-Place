import { forgotPasswordApi, resetPasswordApi, verifyForgotApi } from "../../../api/auth"
import type { forgotPasswordPayload, resetPasswordPayload, verifyForgotOtpPayload } from "../../../types/auth"

export const forgotPasswordApiCall = async (data : forgotPasswordPayload)=>{
    const response = await forgotPasswordApi(data)

    if(!response.data.success){
        throw new Error("Error occur during send otp api call")
    }

    return response.data
}

export const verifyForgotOtpApiCall = async (data: verifyForgotOtpPayload)=>{
    const response = await verifyForgotApi(data)

    if(!response.data.success){
        throw new Error("Error occur during send otp api call")
    }

    return response.data
}

export const resetPasswordApiCall = async (data: resetPasswordPayload)=>{
    const response = await resetPasswordApi(data)

    if(!response.data.success){
        throw new Error("Error occur during send otp api call")
    }

    return response.data
}