import Joi from 'joi';

export const schema = Joi.object({
  data: Joi.object({
    options: Joi.array().has(
      Joi.object({
        options: Joi.array().has(
          Joi.object({
            options: Joi.array().has(
              Joi.object({
                name: Joi.string().valid('user'),
              })
            ),
          })
        ),
      })
    ),
  }),
}).options({ allowUnknown: true });
