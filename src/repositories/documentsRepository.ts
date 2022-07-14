import { documents } from "@prisma/client";
import client from "../config/database.js";

export type CreateDocumentData = Omit<documents, "id" | "userId">;

export async function findById(id: number) {
  const result = await client.documents.findUnique({ where: { id } });
  return result;
}

export async function findByUserId(userId: number) {
  const result = await client.documents.findMany({ where: { userId } });
  return result;
}

export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await client.documents.findFirst({
    where: {
      title,
      userId,
    },
  });
  return result;
}

export async function insert(documentData: CreateDocumentData, userId: number) {
  await client.documents.create({ data: { ...documentData, userId } });
}

export async function deleteById(id: number) {
  await client.documents.delete({ where: { id } });
}
