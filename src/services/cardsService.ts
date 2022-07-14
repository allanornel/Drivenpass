import {
  CreateCardData,
  deleteById,
  findById,
  findByTitleAndUserId,
  findByUserId,
  insert,
} from "../repositories/cardsRepository.js";
import { UserToken } from "./credentialsService.js";
import Cryptr from "cryptr";
import { cards } from "@prisma/client";

const cryptr = new Cryptr(process.env.SECRET_KEY);

export async function createCardService(
  cardData: CreateCardData,
  user: UserToken
) {
  const { title, password, securityCode } = cardData;

  const verifTitle = await findByTitleAndUserId(title, user.id);
  if (verifTitle)
    throw {
      type: "Card with this title already exists",
      message: "Titulo já cadastrado para esse usuário",
      statusCode: 422,
    };
  cardData.password = cryptr.encrypt(password);
  cardData.securityCode = cryptr.encrypt(securityCode);
  await insert(cardData, user.id);
}

export async function getCardsService(user: UserToken, id?: number) {
  if (id) {
    const card = await findCardById(id);
    checkUserId(card, user.id);
    return {
      ...card,
      password: cryptr.decrypt(card.password),
      securityCode: cryptr.decrypt(card.securityCode),
    };
  } else {
    let cards = await findByUserId(user.id);
    cards = cards.map((c) => {
      return {
        ...c,
        password: cryptr.decrypt(c.password),
        securityCode: cryptr.decrypt(c.securityCode),
      };
    });
    return cards;
  }
}

export async function deleteCardService(user: UserToken, id: number) {
  const card = await findCardById(id);
  checkUserId(card, user.id);
  await deleteById(id);
}

async function findCardById(id: number) {
  const card = await findById(id);
  if (!card)
    throw {
      type: "Card not found",
      message: "Cartão não foi encontrado!",
      statusCode: 404,
    };
  return card;
}

function checkUserId(card: cards, userId: number) {
  if (card.userId !== userId)
    throw {
      type: "Unathourized",
      message: "Cartão não pertence ao usuário!",
      statusCode: 401,
    };
}
