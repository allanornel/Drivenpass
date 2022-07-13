import { Router } from "express";
import {
  createNotes,
  deleteNotes,
  getNotes,
} from "../controllers/notesController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createNoteSchema } from "../schemas/notesSchema.js";

const notesRouter = Router();

notesRouter.post(
  "/notes",
  validateToken,
  validateSchema(createNoteSchema),
  createNotes
);
notesRouter.get("/notes", validateToken, getNotes);
notesRouter.delete("/notes/:id", validateToken, deleteNotes);

export default notesRouter;
