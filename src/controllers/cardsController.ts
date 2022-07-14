import { Request, Response } from "express";
import { CreateCardData } from "../repositories/cardsRepository.js";
import { createCardService } from "../services/cardsService.js";
import { UserToken } from "../services/credentialsService.js";

export async function createCard(req: Request, res: Response) {
  const cardData: CreateCardData = req.body;
  const user: UserToken = res.locals.user;
  await createCardService(cardData, user);
  res.sendStatus(201);
}
export async function getCards(req: Request, res: Response) {}
export async function deleteCard(req: Request, res: Response) {}
