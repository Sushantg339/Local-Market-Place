import { getChannel } from "../config/rabbitmq.config.js"

interface IOtpProducer {
    email: string,
    subject: string,
    body: string,
    from: string
}

export const sendOtpMessage = (data: IOtpProducer)=>{
    const channel = getChannel()

    return channel.publish("mail_exchange", "mail_routing_key", Buffer.from(JSON.stringify(data)))
}