import { v4 as uuid } from "uuid";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { comparePasswords, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async register(username: string, password: string): Promise<User> {
    const existing = this.userRepo.findByUsername(username);

    if (existing) {
      throw new Error("User already exists!");
    }

    const hashedPassword = await hashPassword(password);
    const newUser: User = { id: uuid(), username: username, password: hashedPassword, role: "user" };
    this.userRepo.save(newUser);
    return newUser;
  }

  async login(username: string, password: string): Promise<string> {
    const user = this.userRepo.findByUsername(username);
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const match = await comparePasswords(password, user.password);
    if (!match) {
      throw new Error("Invalid credentials!");
    }

    return generateToken(user);
  }
}
