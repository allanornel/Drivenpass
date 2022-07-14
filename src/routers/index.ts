import { Router } from "express";
import authRouter from "./authRouter.js";
import cardsRouter from "./cardsRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import documentsRouter from "./documentsRouter.js";
import notesRouter from "./notesRouter.js";
import wifisRouter from "./wifisRouter.js";

const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(notesRouter);
router.use(wifisRouter);
router.use(cardsRouter);
router.use(documentsRouter);

export default router;
