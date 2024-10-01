import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Router } from "express";
import { addChat, createChat, getChatById } from "../controllers/chat.controller.js";

const router = Router();

router.post("/", ClerkExpressRequireAuth(), createChat)
router.get("/:_id", ClerkExpressRequireAuth(), getChatById)
router.put("/:_id", ClerkExpressRequireAuth(), addChat)

export default router