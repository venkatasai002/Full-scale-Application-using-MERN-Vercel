import express from "express";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { applyMiddlewares } from "./middlewares/shared/shared.middleware";

dotenv.config();

const app = express();

// apply all shared global middlewares
applyMiddlewares(app);
// Routes
app.use("/auth", authRoutes);
app.use("/", protectedRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT! || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
