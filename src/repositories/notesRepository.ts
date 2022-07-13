import { notes } from "@prisma/client";
import client from "../config/database.js";

export type CreateNoteData = Omit<notes, "id" | "userId">;
export async function findById(id: number) {
  const result = await client.notes.findUnique({ where: { id } });
  return result;
}

export async function findByUserId(userId: number) {
  const result = await client.notes.findMany({ where: { userId } });
  return result;
}

export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await client.notes.findFirst({
    where: {
      userId,
      title,
    },
  });
  // await db.query<Notes>(
  // `SELECT * FROM notes WHERE title=$1 AND "userId"=$2`,
  // [title, userId]
  // );
  return result;
}

export async function insert(noteData: CreateNoteData, userId: number) {
  await client.notes.create({ data: { ...noteData, userId } });
  // const { title, annotation } = noteData;
  // await db.query(
  //   `INSERT INTO notes("userId", title, annotation) VALUES ($1, $2, $3)`,
  //   [userId, title, annotation]
  // );
}

export async function deleteById(id: number) {
  await client.notes.delete({ where: { id } });
  // await db.query(`DELETE FROM notes WHERE id=$1`, [id]);
}
