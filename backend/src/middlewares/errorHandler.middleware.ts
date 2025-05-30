import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);

  const statusCode = (err as any).statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    // optionally add stack trace only in dev environment
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
