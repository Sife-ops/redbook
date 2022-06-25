import { db } from '../model';
import { optionValue, mnemonic } from './utility';

export const prediction = async (body: any) => {
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
  let predictionId = mnemonic();

  // unique mnemonic id
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

  const predictorUserId = body.member.user.id;
  const { options } = body.data;
  const conditions = optionValue(options, 'conditions');

  await db
    .insertInto('prediction')
    .values({
      id: predictionId,
      user_id: predictorUserId,
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
  return JSON.stringify({
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
              value: `<@${predictorUserId}>`,
              inline: true,
            },
            {
              name: 'Default Judge',
              value: `<@${judgeUserId}>`,
              inline: true,
            },
            {
              name: 'ID',
              value: predictionId,
              inline: false,
            },
          ],
          footer: {
            // todo: why?
            text: `Permalink?`,
          },
        },
      ],
    },
  });
};
