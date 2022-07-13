import {
  CreateCredentialData,
  find,
  findById,
  findByTitle,
  insert,
} from "../repositories/credentialsRepository.js";
import Cryptr from "cryptr";

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

  const verifTitle = await findByTitle(title);
  if (verifTitle)
    throw {
      type: "Credentials with this title already exists",
      message: "Titulo já cadastrado",
      statusCode: 422,
    };

  credentialData.password = cryptr.encrypt(password);

  await insert(credentialData, user.id);
}

export async function getCredentialsService(user: UserToken, id?: number) {
  if (id) {
    const credential = await findById(user, id);
    if (!credential)
      throw {
        type: "Not Found or Not Authorized",
        message: "Credencial não encontrada ou não pertecente ao usuário",
        statusCode: 404,
      };
    credential.password = cryptr.decrypt(credential.password);
    return credential;
  } else {
    let credentials = await find(user);
    credentials = credentials.map((c) => {
      return { ...c, password: cryptr.decrypt(c.password) };
    });
    return credentials;
  }
}
