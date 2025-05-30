import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      await this.authService.register(username, password);
      return res.status(201).json({ message: `User registered successfully!` });
    } catch (err: unknown) {
      return res.status(400).json({ message: err instanceof Error ? err.message : String(err) });
    }
  };

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const token = await this.authService.login(username, password);
      return res.status(200).json({ token });
    } catch (err: unknown) {
      return res.status(400).json({ message: err instanceof Error ? err.message : String(err) });
    }
  };
}
