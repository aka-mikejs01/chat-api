import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { createRoom, getRoom } from "../controllers/roomController.js";
import { roomValidator } from "../validators/roomValidator.js";

const router = Router();

router.post("/", authMiddleware, roomValidator, createRoom);
router.get("/", authMiddleware, getRoom);

export default router;
