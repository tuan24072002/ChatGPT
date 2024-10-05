import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Router } from "express";
import { addChat, createChat, getChatById } from "../controllers/chat.controller.js";
import multer from 'multer';

const router = Router();
const upload = multer({ dest: "./backend/uploads/files" });

router.post("/", ClerkExpressRequireAuth(), upload.single("file"), createChat)
router.get("/:_id", ClerkExpressRequireAuth(), getChatById)
router.put("/:_id", ClerkExpressRequireAuth(), upload.single("file"), addChat)

export default router