import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCards,
} from "../controllers/cardsController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCardSchema } from "../schemas/cardsSchema.js";

const cardsRouter = Router();

cardsRouter.post(
  "/cards",
  validateToken,
  validateSchema(createCardSchema),
  createCard
);
cardsRouter.get("/cards", validateToken, getCards);
cardsRouter.delete("/cards/:id", validateToken, deleteCard);

export default cardsRouter;
