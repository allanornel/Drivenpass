import { Request, Response } from "express";
import { CreateDocumentData } from "../repositories/documentsRepository.js";
import { UserToken } from "../services/credentialsService.js";
import {
  createDocumentService,
  deleteDocumentService,
  getDocumentsService,
} from "../services/documentsService.js";

export async function createDocument(req: Request, res: Response) {
  const documentData: CreateDocumentData = req.body;
  const user: UserToken = res.locals.user;
  await createDocumentService(documentData, user);
  res.sendStatus(201);
}
export async function getDocument(req: Request, res: Response) {
  const user: UserToken = res.locals.user;
  let id;
  if (req.query && req.query.id) {
    id = (req.query as any).id;
  }
  if (id) {
    const document = await getDocumentsService(user, +id);
    res.status(200).send(document);
  } else {
    const documents = await getDocumentsService(user);
    res.status(200).send(documents);
  }
}
export async function deleteDocument(req: Request, res: Response) {
  const user: UserToken = res.locals.user;
  const { id } = req.params;
  await deleteDocumentService(user, +id);

  res.sendStatus(200);
}
