import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";
import { JWT_SECRET } from "../config/config";

export function generateToken(user: User): string {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
