import joi from "joi";
import { CreateNoteData } from "../repositories/notesRepository.js";

export const createNoteSchema = joi.object<CreateNoteData>({
  title: joi.string().required().max(50),
  annotation: joi.string().required().max(1000),
});
