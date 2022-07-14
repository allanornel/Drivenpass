import { Request, Response } from "express";
import { CreateCardData } from "../repositories/cardsRepository.js";
import {
  createCardService,
  deleteCardService,
  getCardsService,
} from "../services/cardsService.js";
import { UserToken } from "../services/credentialsService.js";

export async function createCard(req: Request, res: Response) {
  const cardData: CreateCardData = req.body;
  const user: UserToken = res.locals.user;
  await createCardService(cardData, user);
  res.sendStatus(201);
}
export async function getCards(req: Request, res: Response) {
  const user: UserToken = res.locals.user;
  let id;
  if (req.query && req.query.id) {
    id = (req.query as any).id;
  }
  if (id) {
    const card = await getCardsService(user, parseInt(id));
    res.status(200).send(card);
  } else {
    const cards = await getCardsService(user);
    res.status(200).send(cards);
  }
}

export async function deleteCard(req: Request, res: Response) {
  const user: UserToken = res.locals.user;
  const { id } = req.params;
  await deleteCardService(user, parseInt(id));
  res.sendStatus(200);
}
