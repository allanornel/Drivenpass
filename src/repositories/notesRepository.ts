import { db } from "../config/database.js";

export interface Notes {
  id: number;
  userId: number;
  title: string;
  annotation: string;
}

export type CreateNoteData = Omit<Notes, "id" | "userId">;

export async function findById(id: number) {
  const result = await db.query<Notes>(`SELECT * FROM notes WHERE id=$1`, [id]);
  return result.rows[0];
}

export async function findByUserId(userId: number) {
  const result = await db.query<Notes>(
    `SELECT * FROM notes WHERE "userId"=$1`,
    [userId]
  );
  return result.rows;
}

export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await db.query<Notes>(
    `SELECT * FROM notes WHERE title=$1 AND "userId"=$2`,
    [title, userId]
  );
  return result.rows[0];
}

export async function insert(noteData: CreateNoteData, userId: number) {
  const { title, annotation } = noteData;
  await db.query(
    `INSERT INTO notes("userId", title, annotation) VALUES ($1, $2, $3)`,
    [userId, title, annotation]
  );
}

export async function deleteById(id: number) {
  await db.query(`DELETE FROM notes WHERE id=$1`, [id]);
}
