// middleware/authValidator.js
import { checkSchema, validationResult } from "express-validator";

const registerSchema = {
  username: {
    in: ["body"],
    trim: true,
    notEmpty: {
      errorMessage: "Username is required",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Username must be at least 3 characters",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email must be valid",
    },
    normalizeEmail: true,
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters",
    },
  },
};

const loginSchema = {
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Valid email required",
    },
    normalizeEmail: true,
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password is required",
    },
  },
};

export const loginValidator = [
  checkSchema(loginSchema),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    next();
  },
];

export const registerValidator = [
  checkSchema(registerSchema),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    next();
  },
];
