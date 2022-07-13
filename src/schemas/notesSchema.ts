import joi from "joi";

export const createNoteSchema = joi.object({
  title: joi.string().required().max(50),
  annotation: joi.string().required().max(1000),
});
