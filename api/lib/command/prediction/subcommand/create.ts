import Joi from 'joi';
import { db } from '../../../model';
import { optionValue, mnemonic } from '../../../utility';

export const create = {
  schema: Joi.object({
    data: Joi.object({
      options: Joi.array().has(
        Joi.object({
          options: Joi.array()
            .has(
              Joi.object({
                name: Joi.string().valid('conditions'),
              })
            )
            .has(
              Joi.object({
                name: Joi.string().valid('judge'),
              })
            ),
        })
      ),
    }),
    member: Joi.object({
      user: Joi.object({
        avatar: Joi.string(),
        discriminator: Joi.string(),
        id: Joi.string(),
        username: Joi.string(),
      }),
    }),
  }).options({ allowUnknown: true }),

  handler: async (body: any) => {
    /*
     * 1) create user record
     * 2) create prediction
     * 3) create judge
     * 4) format message
     */

    // 1) create user record
    try {
      const { id, avatar, discriminator, username } = body.member.user;

      await db
        .insertInto('user')
        .values({
          avatar,
          discriminator,
          id,
          username,
        })
        .executeTakeFirstOrThrow();
    } catch {
      console.log('user exists');
    }

    // 2) create prediction

    // generate unique mnemonic id
    let predictionId = mnemonic();
    while (true) {
      const prediction = await db
        .selectFrom('prediction')
        .selectAll()
        .where('id', '=', predictionId)
        .executeTakeFirst();
      if (prediction) {
        predictionId = mnemonic();
      } else {
        break;
      }
    }

    const predictionUserId = body.member.user.id;
    const { options } = body.data.options[0];
    const conditions = optionValue(options, 'conditions');

    await db
      .insertInto('prediction')
      .values({
        id: predictionId,
        user_id: predictionUserId,
        conditions,
      })
      .executeTakeFirstOrThrow();

    // 3) create judge
    const judgeUserId = optionValue(options, 'judge');

    await db
      .insertInto('judge')
      .values({
        prediction_id: predictionId,
        user_id: judgeUserId,
      })
      .executeTakeFirstOrThrow();

    // 4) format message
    return {
      type: 4,
      data: {
        embeds: [
          {
            title: 'New Prediction',
            description: conditions,
            color: 0x00ffff,
            fields: [
              {
                name: 'By',
                value: `<@${predictionUserId}>`,
                inline: true,
              },
              {
                name: 'Judge',
                value: `<@${judgeUserId}>`,
                inline: true,
              },
              {
                name: 'ID',
                value: predictionId,
                inline: false,
              },
            ],
            // todo: user footer
            // footer: {
            //   text: `Permalink?`,
            // },
          },
        ],
      },
    };
  },
};
