import bcrypt from "bcrypt";

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}
export async function comparePasswords(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
