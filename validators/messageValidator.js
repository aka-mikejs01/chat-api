import { checkSchema, validationResult } from "express-validator";

const messageSchema = {
  content: {
    notEmpty: {
      errorMessage: "Message is required",
    },
    isLength: {
      options: { min: 3, max: 1000 },
    },
  },
};

export const messageValidator = [
  checkSchema(messageSchema),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    next();
  },
];
