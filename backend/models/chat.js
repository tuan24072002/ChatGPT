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
                enum: ["user", "model"],
                required: ["true", "Role is required"]
            },
            parts: [
                {
                    text: {
                        type: String,
                        required: function () {
                            return this.role === "model" ? ["true", "Text is required"] : false
                        }
                    }
                }
            ],
            img: {
                type: String,
                required: false
            },
            file: {
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