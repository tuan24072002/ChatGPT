import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Router } from "express";
import { deleteUserChat, getAllUserChat } from "../controllers/user.controller.js";

const router = Router();

router.get("/user-chat", ClerkExpressRequireAuth(), getAllUserChat)
router.delete("/:chatId", ClerkExpressRequireAuth(), deleteUserChat)

export default router;