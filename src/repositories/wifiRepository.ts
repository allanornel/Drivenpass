import client from "../config/database.js";
import { wifis } from "@prisma/client";

export type CreateWifiData = Omit<wifis, "id" | "userId">;
export async function findById(id: number) {
  const result = await client.wifis.findUnique({ where: { id } });
  return result;
}

export async function findByUserId(userId: number) {
  const result = await client.wifis.findMany({ where: { userId } });
  return result;
}

export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await client.wifis.findFirst({
    where: {
      userId,
      title,
    },
  });
  return result;
}

export async function insert(wifiData: CreateWifiData, userId: number) {
  await client.wifis.create({ data: { ...wifiData, userId } });
}

export async function deleteById(id: number) {
  await client.wifis.delete({ where: { id } });
}
