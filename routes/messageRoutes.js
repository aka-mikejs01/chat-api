import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createMessage,
  getRoomMessages,
} from "../controllers/messageController.js";
import { messageValidator } from "../validators/messageValidator.js";

const router = Router();

router.post("/:roomId", authMiddleware, messageValidator, createMessage);
router.get("/:roomId", authMiddleware, getRoomMessages);

export default router;
