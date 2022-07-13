import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware";
import { validateSchema } from "../middlewares/validateSchema";
import { createNoteSchema } from "../schemas/notesSchema";

const notesRouter = Router();

notesRouter.post("/notes", validateToken, validateSchema(createNoteSchema));
notesRouter.get("/notes", validateToken);
notesRouter.delete("/notes/:id", validateToken);

export default notesRouter;
