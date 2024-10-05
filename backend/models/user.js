import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userClerkId: {
        type: String,
        required: ["true", "userClerkId is required"]
    },
    chatList: [
        {
            _id: {
                type: mongoose.Types.ObjectId,
                required: ["true", "chatId is required"]
            },
            title: {
                type: String,
                required: ["true", "title is required"]
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]
}, {
    timestamps: true
})
const User = mongoose.model("User", userSchema);
export default User