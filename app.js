import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import logger from "./middleware/logger.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  morgan("combined", { stream: { write: (msgs) => logger.http(msgs.trim()) } })
);

// * routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/rooms", roomRoutes);

app.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.json({ message: "Server running" });
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      logger.info(`Server running on port: http://localhost:${PORT}`)
    );
  } catch (err) {
    logger.error(`Error while running server ${err.message}`);
  }
};

startServer();
