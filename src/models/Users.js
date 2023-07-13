import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phonenumber: {
            type: String,
            required: false,
        }
    }
)

export const UserModel = mongoose.model("users", userSchema);