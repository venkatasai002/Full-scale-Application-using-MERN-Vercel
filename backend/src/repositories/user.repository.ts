import { User } from "../entities/user.entity";

export class UserRepository {
  private users: User[] = [];

  findByUsername(username: string): User | undefined {
    return this.users.find((item) => item.username == username);
  }

  save(user: User): void {
    this.users.push(user);
  }
}
