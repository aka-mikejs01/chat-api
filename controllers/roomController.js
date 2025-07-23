import Room from "../models/Room.js";
import { matchedData } from "express-validator";
import logger from "../middleware/logger.js";

export const createRoom = async (req, res) => {
  try {
    const { name } = matchedData(req);

    const nameExist = await Room.findOne({ name });
    if (nameExist) {
      logger.warn(`Name already exists: ${name}`);
      return res.status(401).json("Name is used for a room");
    }

    const room = new Room({ name, createdBy: req.userId });
    await room.save();
    logger.info("New room created");
    res.json(room);
  } catch (err) {
    res.status(500).json({
      message: "Error occured while creating room",
      error: err.message,
    });
    logger.error("Error while creating room");
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await Room.find({ createdBy: req.userId });
    if (!room) return res.status(404).json({ message: "No room found" });

    res.json(room);
  } catch (err) {
    res.status(500).json({
      message: "Error occured while getting rooms",
      error: err.message,
    });
    logger.error("Error while getting logs");
  }
};
