import mongoose from "mongoose";

type Role = "user" | "worker" | "admin"

export interface IUser{
    fullName: string,
    email: string,
    password: string,
    role: Role
}

const userSchema = new mongoose.Schema<IUser>({
    fullName: {
        type: String, 
        trim: true,
        required: [true, "fullname field is missing"]
    },
    email:{
        type: String,
        required: [true, "email field is missing"],
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: [true, "password field is missing"]
    },
    role: {
        type: String,
        enum: ["user", "worker", "admin"],
        default: "user"
    }
}, {timestamps: true})

const User = mongoose.model<IUser>("User", userSchema)

export default User