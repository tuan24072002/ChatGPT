import User from "../models/user.js";

export const getAllUserChat = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const users = await User.find({ userClerkId: userId });
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