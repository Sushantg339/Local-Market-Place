import "dotenv/config"

import app from "./app.js";
import { connectToRabbitMQ } from "./config/rabbitmq.config.js";
import { mailOtpConsumer } from "./consumers/otpConsumer.js";

const PORT = process.env.PORT || 5000

const main = async()=>{
    try {
        await connectToRabbitMQ()
        await mailOtpConsumer()

        app.listen(PORT, ()=>{
            console.log(`mail service running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Startup error:", (error as Error).message)
        process.exit(1)
    }
}

main()