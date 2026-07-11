import { loginApi } from "../../../api/auth"
import type { loginPayload } from "../../../types/auth"

export const loginApiCall = async (data : loginPayload)=>{
    const response = await loginApi(data)

    if(!response.data.success){
        throw new Error("Error occur during send otp api call")
    }

    return response.data
}