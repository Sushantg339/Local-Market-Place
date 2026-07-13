import amqp, { type Channel } from "amqplib"
import { AppError } from "../utils/appError.js"

const RABBITMQ_URI= process.env.RABBITMQ_URI

if(!RABBITMQ_URI){
    throw new AppError(5000, "Rabbit MQ url is missing")
}

let connection: amqp.ChannelModel;
let channel: Channel

export const connectToRabbitMQ = async (
    retries = 5,
    delay = 3000
) => {
    while (retries > 0) {
        try {
            connection = await amqp.connect(RABBITMQ_URI);

            channel = await connection.createChannel();

            await channel.assertExchange("mail_exchange", "direct",{
                durable: false,
            });

            await channel.assertQueue("mail_queue", {durable: true})
            await channel.bindQueue("mail_queue", "mail_exchange", "mail_routing_key")

            console.log("Connected to RabbitMQ");
            return { connection, channel };
        } catch (error) {
            console.error("RabbitMQ connection failed:", error);

            retries--;

            if (retries === 0) {
                throw new Error("Failed to connect to RabbitMQ");
            }

            console.log(`Retrying in ${delay / 1000}s...`);

            await new Promise((resolve) =>
                setTimeout(resolve, delay)
            );
        }
    }
};

export const getChannel = () => channel;