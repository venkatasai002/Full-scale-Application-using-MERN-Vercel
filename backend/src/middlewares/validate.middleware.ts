import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// reusable middleware that validates req.body against the given schema
export function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: true });

    if (error) {
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
      return;
    }
    next(); // validation passed, continue
  };
}
