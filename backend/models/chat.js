import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userClerkId: {
        type: String,
        required: ["true", "UserId is required"]
    },
    history: [
        {
            role: {
                type: String,
                enum: ["user", "assistant"],
                required: ["true", "Role is required"]
            },
            contents: [
                {
                    text: {
                        type: String,
                        required: ["true", "Text is required"]
                    }
                }
            ],
            img: {
                type: String,
                required: false
            }
        }
    ]
}, {
    timestamps: true
})

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;