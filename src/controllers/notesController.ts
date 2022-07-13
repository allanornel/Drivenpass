import { Request, Response } from "express";
import { CreateNoteData } from "../repositories/notesRepository.js";
import { UserToken } from "../services/credentialsService.js";
import {
  createNoteService,
  deleteNoteService,
  getNotesService,
} from "../services/notesService.js";

export async function createNotes(req: Request, res: Response) {
  const noteData: CreateNoteData = req.body;
  const user: UserToken = res.locals.user;
  await createNoteService(noteData, user);
  res.sendStatus(201);
}
export async function getNotes(req: Request, res: Response) {
  const user: UserToken = res.locals.user;
  let id;
  if (req.query && req.query.id) {
    id = (req.query as any).id;
  }
  if (id) {
    const credential = await getNotesService(user, parseInt(id));
    res.status(200).send(credential);
  } else {
    const credentials = await getNotesService(user);
    console.log(credentials);
    res.status(200).send(credentials);
  }
}
export async function deleteNotes(req: Request, res: Response) {
  const user: UserToken = res.locals.user;

  const { id } = req.params;
  await deleteNoteService(user, parseInt(id));
  res.sendStatus(200);
}
