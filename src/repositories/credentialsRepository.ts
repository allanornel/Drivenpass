import { db } from "../config/database.js";
import { UserToken } from "../services/credentialsService.js";

export interface Credentials {
  id: number;
  userId: number;
  title: string;
  url: string;
  username: string;
  password: string;
}

export type CreateCredentialData = Omit<Credentials, "id" | "userId">;

export async function find(user: UserToken) {
  const result = await db.query<Credentials>(
    `SELECT * FROM credentials WHERE "userId" = $1`,
    [user.id]
  );
  return result.rows;
}

export async function findById(id: number) {
  const result = await db.query<Credentials>(
    `SELECT * FROM credentials WHERE id=$1 `,
    [id]
  );
  return result.rows[0];
}

export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await db.query<Credentials>(
    `SELECT * FROM credentials WHERE title=$1 AND "userId"=$2`,
    [title, userId]
  );

  return result.rows[0];
}

export async function insert(
  credentialData: CreateCredentialData,
  userId: number
) {
  const { title, url, username, password } = credentialData;
  await db.query(
    `INSERT INTO credentials ("userId", title, url, username, password) VALUES ($1, $2, $3, $4, $5)`,
    [userId, title, url, username, password]
  );
}

export async function deleteById(id: number) {
  await db.query(`DELETE FROM credentials WHERE id=$1`, [id]);
}
