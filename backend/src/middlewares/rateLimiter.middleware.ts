import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min window
  max: 10, // limit ip to 10 requests
  message: { message: "Too many requests, try again later!" },
});
