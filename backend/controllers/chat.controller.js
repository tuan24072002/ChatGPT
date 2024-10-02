import { text } from "express";
import Chat from "../models/chat.js";
import User from "../models/user.js";

export const createChat = async (req, res) => {
    const userId = req.auth.userId;
    const { text, img } = req.body;
    try {
        const newChat = new Chat({
            userClerkId: userId,
            history: [
                {
                    role: "user",
                    parts: [{ text },],
                    img
                }
            ]
        })
        const saveChat = await newChat.save();

        const checkUser = await User.find({ userClerkId: userId })
        if (checkUser.length === 0) {
            const newUser = new User({
                userClerkId: userId,
                chatList: [
                    {
                        chatId: saveChat._id,
                        title: text.substring(0, 40)
                    }
                ]
            })
            await newUser.save();
        } else {
            await User.updateOne({ userClerkId: userId }, {
                $push: {
                    chatList: {
                        chatId: saveChat._id,
                        title: text.substring(0, 40)
                    }
                }
            })
        }
        res.status(200).send(saveChat._id);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error creating chat !`)
    }
}

export const getChatById = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { _id } = req.params;
        const chatById = await Chat.findOne({ _id, userClerkId: userId });
        res.status(200).send(chatById);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error fetching chat by id !`)
    }
}

export const addChat = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { question, answer, img } = req.body;
        const { _id } = req.params;
        const newItem = [
            ...(question ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }] : []),
            { role: "model", parts: [{ text: answer }] }
        ];

        const updateChat = await Chat.updateOne({ _id, userClerkId: userId }, {
            $push: {
                history: {
                    $each: newItem
                }
            }
        });
        res.status(200).send(updateChat);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error adding chat !`)
    }
}