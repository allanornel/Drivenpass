import { Router } from "express";
import {
  createDocument,
  deleteDocument,
  getDocument,
} from "../controllers/documentsController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createDocumentSchema } from "../schemas/documentsSchema.js";

const documentsRouter = Router();

documentsRouter.post(
  "/documents",
  validateToken,
  validateSchema(createDocumentSchema),
  createDocument
);
documentsRouter.get("/documents", validateToken, getDocument);
documentsRouter.delete("/documents/:id", validateToken, deleteDocument);

export default documentsRouter;
