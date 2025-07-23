import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refresh,
} from "../controllers/authController.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/authValidator.js";

const router = Router();

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", refresh);

export default router;
