import cloudinary from "../lib/cloudinary.js";
import Chat from "../models/chat.js";
import User from "../models/user.js";
import { mkdirSync, renameSync } from 'fs';

export const createChat = async (req, res) => {
    const userId = req.auth.userId;
    const { text, img } = req.body;
    const { file } = req;

    try {
        let cloudinaryResponse = null;
        if (img) {
            cloudinaryResponse = await cloudinary.uploader.upload(img, { folder: "chatgpt" })
        }
        let fileName = "";
        if (file) {
            const date = Date.now()
            let fileDir = `./backend/uploads/files/${date}`
            fileName = `${fileDir}/${file.originalname}`;
            mkdirSync(fileDir, { recursive: true })
            renameSync(file.path, fileName)
        }
        const newChat = new Chat({
            userClerkId: userId,
            history: [
                {
                    role: "user",
                    parts: [{ text },],
                    img: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
                    file: file ? fileName : ""
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
                        _id: saveChat._id,
                        title: text.substring(0, 40)
                    }
                ]
            })
            await newUser.save();
        } else {
            await User.updateOne({ userClerkId: userId }, {
                $push: {
                    chatList: {
                        _id: saveChat._id,
                        title: text.substring(0, 40)
                    }
                }
            })
        }
        res.status(200).send(saveChat._id);
    } catch (error) {
        console.log(`Error creating chat: `, error.message);
        res.status(500).send(`Error creating chat !`)
    }
}

export const addChat = async (req, res) => {
    const userId = req.auth.userId;
    const { question, answer, img } = req.body;
    const { file } = req;
    const { _id } = req.params;
    if (!_id || !answer) {
        return res.status(400).send("Missing required parameters");
    }
    try {
        let cloudinaryResponse = null;
        if (img) {
            cloudinaryResponse = await cloudinary.uploader.upload(img, { folder: "chatgpt" })
        }
        let fileName = "";
        if (file) {
            const date = Date.now()
            let fileDir = `./backend/uploads/files/${date}`
            fileName = `${fileDir}/${file.originalname}`;
            mkdirSync(fileDir, { recursive: true })
            renameSync(file.path, fileName)
        }
        const newItem = [
            ...(question ? [{ role: "user", parts: [{ text: question }], ...(img && { img: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "" }), ...(file && { file: fileName }) }] : []),
            { role: "model", parts: [{ text: answer }] }
        ];

        const updateChat = await Chat.updateOne({ _id, userClerkId: userId }, {
            $push: {
                history: {
                    $each: newItem
                }
            }
        });
        const getChat = await Chat.findById(_id)
        res.status(200).send({ chat: getChat });
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error adding chat !`)
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