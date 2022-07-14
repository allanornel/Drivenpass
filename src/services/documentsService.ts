import { documents } from "@prisma/client";
import {
  CreateDocumentData,
  deleteById,
  findById,
  findByTitleAndUserId,
  findByUserId,
  insert,
} from "../repositories/documentsRepository.js";
import { UserToken } from "./credentialsService.js";

export async function createDocumentService(
  documentData: CreateDocumentData,
  user: UserToken
) {
  const { title } = documentData;
  const verifTitle = await findByTitleAndUserId(title, user.id);
  if (verifTitle)
    throw {
      type: "Credentials with this title already exists",
      message: "Titulo já cadastrado para esse usuário",
      statusCode: 422,
    };
  await insert(documentData, user.id);
}

export async function getDocumentsService(user: UserToken, id?: number) {
  if (id) {
    const document = await findDocumentById(id);
    checkUserId(document, user.id);
    return document;
  } else {
    const documents = await findByUserId(user.id);
    return documents;
  }
}
export async function deleteDocumentService(user: UserToken, id: number) {
  const document = await findDocumentById(id);
  checkUserId(document, id);
  await deleteById(id);
}

async function findDocumentById(id: number) {
  const document = await findById(id);
  if (!document)
    throw {
      type: "Not Found",
      message: "Documento não encontrado!",
      statusCode: 404,
    };
  return document;
}

function checkUserId(document: documents, userId: number) {
  if (document.userId !== userId)
    throw {
      type: "Unathourized",
      message: "Documento não pertence ao usuário!",
      statusCode: 401,
    };
}
