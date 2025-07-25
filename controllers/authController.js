import User from "../models/User.js";
import { matchedData } from "express-validator";
import logger from "../middleware/logger.js";
import jwt from "jsonwebtoken";
import { getAccessToken, getRefreshToken } from "../utils/getToken.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = matchedData(req);

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      logger.warn(`Existing username: ${usernameExist.username}`);
      return res.status(401).json({ message: "Username already in use" });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      logger.warn(`Existing email: ${emailExist.email}`);
      return res.status(401).json({ message: "Email already in use" });
    }

    const user = new User({ username, email, password });
    await user.save();
    logger.info(`New user registered: ${user.username}`);

    const accessToken = getAccessToken(user._id);
    const refreshToken = getRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ accessToken });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error occured while registering", error: err.message });
    logger.info("Got error while registering user");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    const user = await User.findOne({ email });
    if (!user) {
      logger.info(`Invalid credential ${email}`);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = getAccessToken(user._id);
    const refreshToken = getRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
    logger.info(`${user.username} logged in`);
  } catch (err) {
    res
      .status(500)
      .json({ messae: "Error occured while logging in", error: err.message });
    logger.error("Got error while logging user");
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.json({ message: "Logged out successfully" });
  logger.info("User logged out");
};

export const refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(403).json({ message: "No token provided" });

  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const accessToken = getAccessToken(decoded.userId);
    res.json({ accessToken });
    logger.info(`user id: ${decoded.userId} refreshed token`);
  });
};
