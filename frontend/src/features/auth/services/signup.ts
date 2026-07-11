import type { signupPayload, verifyOtpPayload } from '../../../types/auth';
import { sendOtpApi, signupApi } from './../../../api/auth';

export const signupApiCall = async (data : signupPayload)=>{
    const response = await sendOtpApi(data)

    if(!response.data.success){
        throw new Error("Error occur during send otp api call")
    }

    return response.data
}

export const verifyOtpApiCall = async(data: verifyOtpPayload)=>{
    const res = await signupApi(data)

    if(!res.data.success){
        throw new Error("Error occur during send otp api call")
    }

    return res.data
}