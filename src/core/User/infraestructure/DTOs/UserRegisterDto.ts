import { body, validationResult } from 'express-validator';

export const UserRegisterDto = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('name').isString().withMessage('Name must be a string'),
  body('lastname').isString().withMessage('Last name must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
