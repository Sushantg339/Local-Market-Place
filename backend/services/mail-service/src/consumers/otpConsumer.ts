import { getChannel } from "../config/rabbitmq.config.js"
import { sendMailService } from "../services/mail.services.js"

export const mailOtpConsumer = ()=>{
    const channel = getChannel()
    console.log("reecieved")

    channel.consume("mail_queue", async (message)=>{
        if(message){
            try {
                await sendMailService(JSON.parse(message.content.toString()))
                channel.ack(message)
            } catch (error) {
                channel.nack(message)
            }
        }
    })
}