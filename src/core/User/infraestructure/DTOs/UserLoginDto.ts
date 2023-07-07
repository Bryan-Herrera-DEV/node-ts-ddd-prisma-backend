import { body, validationResult } from "express-validator";

export const UserLoginDto = [
  body("email").isEmail().withMessage("Must be a valid email"),
  body("password").isString().withMessage("Password must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
