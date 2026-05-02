import mongoose from "mongoose"

const AUTH_MONGO_URI = process.env.AUTH_MONGO_URI

if (!AUTH_MONGO_URI) {
    throw new Error("Connection string missing")
}

const connectToDb = async () => {
    try {
        await mongoose.connect(AUTH_MONGO_URI)
        console.log(`MongoDB connected: ${mongoose.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection failed:", (error as Error).message)
        process.exit(1)
    }
}

export default connectToDb