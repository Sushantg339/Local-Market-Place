import transporter from "../config/mail.config.js";
import type { IMailData } from "../controllers/mail.controller.js";

export const sendMailService = async(data: IMailData)=>{
    const res = await transporter.sendMail({
        from: data.from,
        to: data.email,
        subject: data.subject,
        html: data.body
    })

    return res
}