import expressWinston from "express-winston";
import winston from "winston";

export const logger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
  format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  meta: true, // log metadata about requests (default true)
  expressFormat: true, // Use default Express/morgan format
  colorize: false,
});
