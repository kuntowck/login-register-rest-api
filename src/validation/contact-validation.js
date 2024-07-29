import Joi from "joi";

const createContactValidation = Joi.object({
  firstName: Joi.string().max(100).required(),
  lastName: Joi.string().max(100).optional(),
  email: Joi.string().email().max(200).optional(),
  phone: Joi.string().max(20).optional(),
});

export { createContactValidation };
