import {
  CreateNoteData,
  deleteById,
  findById,
  findByUserId,
} from "../repositories/notesRepository.js";
import { UserToken } from "./credentialsService.js";
import {
  findByTitleAndUserId,
  insert,
} from "./../repositories/notesRepository.js";
import { notes } from "@prisma/client";

export async function createNoteService(
  noteData: CreateNoteData,
  user: UserToken
) {
  const { title, annotation } = noteData;
  const verifTitle = await findByTitleAndUserId(title, user.id);
  if (verifTitle)
    throw {
      type: "Credentials with this title already exists",
      message: "Titulo já cadastrado para esse usuário",
      statusCode: 422,
    };

  await insert(noteData, user.id);
}

export async function getNotesService(user: UserToken, id?: number) {
  if (id) {
    const note = await findNoteById(id);
    checkUserId(note, user.id);
    return note;
  } else {
    let notes = await findByUserId(user.id);
    return notes;
  }
}

export async function deleteNoteService(user: UserToken, id: number) {
  const note = await findNoteById(id);
  checkUserId(note, user.id);
  await deleteById(id);
}

async function findNoteById(id: number) {
  const note = await findById(id);
  if (!note)
    throw {
      type: "Note not found",
      message: "Nota não foi encontrada!",
      statusCode: 404,
    };
  return note;
}

function checkUserId(note: notes, userId: number) {
  if (note.userId !== userId)
    throw {
      type: "Unathourized",
      message: "Credencial não pertence ao usuário!",
      statusCode: 401,
    };
}
