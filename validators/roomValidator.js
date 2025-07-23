import { checkSchema, validationResult } from "express-validator";

const roomSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
    isLength: {
      options: { min: 3, max: 10 },
    },
  },
};

export const roomValidator = [
  checkSchema(roomSchema),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) return res.status(400).json({ error: error.array() });

    next();
  },
];
