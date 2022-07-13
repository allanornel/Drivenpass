import client from "../config/database.js";
import { UserToken } from "../services/credentialsService.js";
import { credentials } from "@prisma/client";

export type CreateCredentialData = Omit<credentials, "id" | "userId">;

export async function findByUserId(user: UserToken) {
  const result = await client.credentials.findMany({
    where: {
      userId: user.id,
    },
  });
  return result;
}

export async function findById(id: number) {
  const result = await client.credentials.findUnique({
    where: {
      id,
    },
  });
  return result;
}

export async function findByTitleAndUserId(title: string, userId: number) {
  const result = await client.credentials.findFirst({
    where: {
      title,
      userId,
    },
  });
  return result;
}

export async function insert(
  credentialData: CreateCredentialData,
  userId: number
) {
  await client.credentials.create({ data: { ...credentialData, userId } });
}

export async function deleteById(id: number) {
  await client.credentials.delete({ where: { id } });
}
