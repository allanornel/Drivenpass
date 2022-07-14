import client from "../config/database.js";
import { users } from "@prisma/client";

export type CreateUserData = Omit<users, "id">;

export async function findByEmail(email: string) {
  const result = await client.users.findUnique({ where: { email } });
  return result;
}

export async function insert(userData: CreateUserData) {
  await client.users.create({ data: userData });
}
