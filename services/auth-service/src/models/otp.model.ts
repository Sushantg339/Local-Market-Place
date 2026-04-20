import mongoose from "mongoose";

export interface IOtp{
    otp: string,
    email: string
}

const otpSchema = new mongoose.Schema<IOtp>({
    otp:{
        type: String,
        required: [true, "Otp is required"],
        length: 4
    },
    email:{
        type: String,
        required: [true, "email field is missing"],
        trim: true,
        lowercase: true
    }
}, {timestamps: true})

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 })

const Otp = mongoose.model<IOtp>("Otp", otpSchema)

export default Otp