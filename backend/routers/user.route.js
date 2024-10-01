import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Router } from "express";
import { getAllUserChat } from "../controllers/user.controller.js";

const router = Router();
router.get("/user-chat", ClerkExpressRequireAuth(), getAllUserChat)
export default router;