import Joi from '@hapi/joi';

export const openAccountSchema = Joi.object({
  email: Joi.string().label('Email Address').email().required(),
  password: Joi.string().label('Password').min(6).required().strict(),
});
