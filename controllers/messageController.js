import Message from "../models/Message.js";
import { matchedData } from "express-validator";
import logger from "../middleware/logger.js";

export const createMessage = async (req, res) => {
  try {
    const { content } = matchedData(req);

    const messages = new Message({
      content,
      user: req.userId,
      room: req.params.roomId,
    });
    await messages.save();
    logger.info(`new message sent by user: ${req.userId}`);
    res.status(201).json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error occured while sending", error: err.message });
    logger.error(err.message);
  }
};

export const getRoomMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId }).populate(
      "user",
      "username"
    );
    if (!messages)
      return res.status(404).json({ message: "No messages found" });

    res.json(messages);
  } catch (err) {
    res.status(500).json({
      message: "Error occured while getting messages",
      error: err.message,
    });
    logger.error(err.message);
  }
};
