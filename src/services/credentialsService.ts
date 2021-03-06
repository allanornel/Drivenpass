import {
  CreateCredentialData,
  deleteById,
  findByUserId,
  findById,
  findByTitleAndUserId,
  insert,
} from "../repositories/credentialsRepository.js";
import Cryptr from "cryptr";
import { credentials } from "@prisma/client";

const cryptr = new Cryptr(process.env.SECRET_KEY);
export interface UserToken {
  email: string;
  id: number;
}

export async function createCredentialService(
  credentialData: CreateCredentialData,
  user: UserToken
) {
  const { title, url, username, password } = credentialData;

  const verifTitle = await findByTitleAndUserId(title, user.id);
  if (verifTitle)
    throw {
      type: "Credentials with this title already exists",
      message: "Titulo já cadastrado para esse usuário",
      statusCode: 422,
    };

  credentialData.password = cryptr.encrypt(password);

  await insert(credentialData, user.id);
}

export async function getCredentialsService(user: UserToken, id?: number) {
  if (id) {
    const credential = await findCredentialById(id);
    checkUserId(credential, user.id);
    credential.password = cryptr.decrypt(credential.password);
    return credential;
  } else {
    let credentials = await findByUserId(user);
    credentials = credentials.map((c) => {
      return { ...c, password: cryptr.decrypt(c.password) };
    });
    return credentials;
  }
}

async function findCredentialById(id: number) {
  const credential = await findById(id);
  if (!credential)
    throw {
      type: "Not Found",
      message: "Credencial não encontrada!",
      statusCode: 404,
    };
  return credential;
}

async function checkUserId(credential: credentials, userId: number) {
  if (credential.userId !== userId)
    throw {
      type: "Unathourized",
      message: "Credencial não pertence ao usuário!",
      statusCode: 401,
    };
}

export async function deleteCredentialService(user: UserToken, id: number) {
  const credential = await findCredentialById(id);
  checkUserId(credential, user.id);
  await deleteById(id);
}
