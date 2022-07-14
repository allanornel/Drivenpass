import client from "../config/database.js";
import { cards } from "@prisma/client";

export type CreateCardData = Omit<cards, "id" | "userId">;

export async function findById(id: number) {
  const result = await client.cards.findUnique({ where: { id } });
  return result;
}

export async function findByUserId(userId: number) {
  const result = await client.cards.findMany({ where: { userId } });
  return result;
}

export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await client.cards.findFirst({
    where: {
      userId,
      title,
    },
  });
  return result;
}

export async function insert(cardData: CreateCardData, userId: number) {
  await client.cards.create({ data: { ...cardData, userId } });
}

export async function deleteById(id: number) {
  await client.cards.delete({ where: { id } });
}
