import type { signupPayload } from '../../../types/auth';
import { sendOtpApi } from './../../../api/auth';
export const signupApiCall = async (data : signupPayload)=>{
    const response = await sendOtpApi(data)

    if(!response.data.success){
        throw new Error("Error occur during send otp api call")
    }

    return response.data
}