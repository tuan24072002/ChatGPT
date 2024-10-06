import User from "../models/user.js";
import Chat from "../models/chat.js";

export const getAllUserChat = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const users = await User.aggregate([
            { $match: { userClerkId: userId } },
            { $unwind: "$chatList" },
            { $sort: { "chatList.createdAt": -1 } },
            { $group: { _id: "$_id", chatList: { $push: "$chatList" } } }
        ]);
        if (users.length > 0) {
            res.status(200).send(users[0].chatList);
        } else {
            res.status(200).send("User not found")
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching all users")
    }
}

export const deleteUserChat = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { chatId } = req.params;
        const deleteInChatList = await User.updateOne(
            { userClerkId: userId },
            {
                $pull:
                {
                    chatList:
                    {
                        _id: chatId
                    }
                }
            }
        );
        const deleteChat = await Chat.findByIdAndDelete(chatId);
        res.status(200).send("Chat deleted successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching all users")
    }
}