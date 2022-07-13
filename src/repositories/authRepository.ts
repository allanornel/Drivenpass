import { db } from "../config/database";

export interface User {
  id: number;
  email: string;
  password: string;
}

export type CreateUserData = Omit<User, "id">;

export async function findByEmail(email: string) {
  const result = await db.query<User>(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return result.rows[0];
}

export async function insert(userData: CreateUserData) {
  const { email, password } = userData;
  db.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [
    email,
    password,
  ]);
}
