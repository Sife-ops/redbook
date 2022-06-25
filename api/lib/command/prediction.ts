import { db } from '../model';
import { optionValue, mnemonic } from './utility';

export const prediction = async (body: any) => {
  /*
   * 1) Create prediction.
   * 2) Create judge.
   * 3) Format message.
   */

  // 1) Create prediction
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

  // 2) Create judge
  const judgeUserId = optionValue(options, 'judge');

  await db
    .insertInto('judge')
    .values({
      prediction_id: predictionId,
      user_id: judgeUserId,
    })
    .executeTakeFirstOrThrow();

  // 3) Format message
  return JSON.stringify({
    type: 4,
    data: {
      embeds: [
        {
          title: 'New Prediction',
          description: `${conditions}`,
          color: 0x00ffff,
          fields: [
            {
              name: `Predictor`,
              value: `<@${predictorUserId}>`,
              inline: true,
            },
            {
              name: `Default judge`,
              value: `<@${judgeUserId}>`,
              inline: true,
            },
            {
              name: `Prediction ID`,
              value: `${predictionId}`,
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
