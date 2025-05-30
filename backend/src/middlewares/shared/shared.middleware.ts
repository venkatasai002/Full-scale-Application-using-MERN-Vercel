import cors from "cors";
import express from "express";
import { logger } from "../logger.middleware";
import helmet from "helmet";
import compression from "compression";

export const applyMiddlewares = (app: express.Application) => {
  // Body parser
  app.use(express.json());

  // CORS
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

  // Helmet for security
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  // compression for http requests reponse
  app.use(compression());

  // Custom logger middleware
  app.use(logger);
};
