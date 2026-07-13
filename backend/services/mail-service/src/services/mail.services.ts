import transporter from "../config/mail.config.js";
import type { IMailData } from "../types/mail.types.js";

export const sendMailService = async(data: IMailData)=>{
    const res = await transporter.sendMail({
        from: data.from,
        to: data.email,
        subject: data.subject,
        html: data.body
    })

    return res
}