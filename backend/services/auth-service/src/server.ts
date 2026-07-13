import "dotenv/config"
import app from "./app.js";
import connectToDb from "./config/db.config.js";
import client from "./config/redis.config.js";
import { connectToRabbitMQ } from "./config/rabbitmq.config.js";

const PORT = process.env.PORT || 5000


const main = async()=>{
    try {
        await connectToDb();
        await client.connect();
        await connectToRabbitMQ()

        app.listen(PORT, ()=>{
            console.log(`auth service running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Startup error:", (error as Error).message)
        process.exit(1)
    }
}

main()