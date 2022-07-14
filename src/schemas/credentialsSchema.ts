import joi from "joi";
import { CreateCredentialData } from "../repositories/credentialsRepository.js";

export const createCredentialSchema = joi.object<CreateCredentialData>({
  title: joi.string().required(),
  url: joi.string().uri().required(),
  username: joi.string().required(),
  password: joi.string().required(),
});
