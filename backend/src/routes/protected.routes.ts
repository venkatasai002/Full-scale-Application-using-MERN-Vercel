import express from "express";
import { authenticate } from "../middlewares/authenticate.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { rateLimiter } from "../middlewares/rateLimiter.middleware";

const router = express.Router();

// public endpoint for testing
router.get("/public", (req, res) => {
  res.json({ message: "This is a public route for testing!" });
});

// authenticated user access
router.get("/user", rateLimiter, authenticate as express.RequestHandler, (req, res) => {
  res.json({ message: "Hello User!" });
});

// Admin-only access
router.get(
  "/admin",
  rateLimiter,
  authenticate as express.RequestHandler,
  authorize("admin") as express.RequestHandler,
  (req, res) => {
    res.json({ message: "Hello Admin!" });
  },
);

export default router;
