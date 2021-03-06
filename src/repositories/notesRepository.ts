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
  return result;
}

export async function insert(noteData: CreateNoteData, userId: number) {
  await client.notes.create({ data: { ...noteData, userId } });
}

export async function deleteById(id: number) {
  await client.notes.delete({ where: { id } });
}
