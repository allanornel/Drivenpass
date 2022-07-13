import { Router } from "express";
import {
  createCredential,
  getCredentials,
} from "../controllers/credentialsController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCredentialSchema } from "../schemas/credentialsSchema.js";

const credentialsRouter = Router();

credentialsRouter.post(
  "/credentials",
  validateToken,
  validateSchema(createCredentialSchema),
  createCredential
);
credentialsRouter.get("/credentials", validateToken, getCredentials);
credentialsRouter.delete("/credentials/:id", validateToken);

export default credentialsRouter;
