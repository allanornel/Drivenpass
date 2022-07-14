import joi from "joi";
import { CreateCardData } from "../repositories/cardsRepository.js";

export const createCardSchema = joi.object<CreateCardData>({
  title: joi.string().required(),
  number: joi.string().required().creditCard(),
  securityCode: joi
    .string()
    .required()
    .length(3)
    .pattern(/^\d{3}$/),
  expirationDate: joi
    .string()
    .required()
    .pattern(/^\d{2}[\/]\d{2}$/),
  isVirtual: joi.boolean().required(),
  password: joi
    .string()
    .required()
    .pattern(/^\d{4}$|^\d{6}$/),
  type: joi.string().required().valid("debit", "credit", "both"),
});
