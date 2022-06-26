import { db } from '../../../model';
import { optionValue } from '../../utility';

export const summary = async (body: any) => {
  const { options } = body.data.options[0];
  const userId = optionValue(options, 'user');

  const predictions = await db
    .selectFrom('prediction')
    .where('user_id', '=', userId)
    .selectAll()
    .execute();

  interface Stats {
    correct: number;
    incorrect: number;
    undecided: number;
    total: number;
  }

  const stats = predictions.reduce(
    (a: Stats, c) => {
      if (c.verdict === null) {
        return {
          ...a,
          undecided: a.undecided + 1,
        };
      } else if (c.verdict) {
        return {
          ...a,
          correct: a.correct + 1,
        };
      } else {
        return {
          ...a,
          incorrect: a.incorrect + 1,
        };
      }
    },
    {
      correct: 0,
      incorrect: 0,
      undecided: 0,
      total: predictions.length,
    }
  );

  console.log(stats);

  return JSON.stringify({
    type: 4,
    data: {
      content: 'test',
    },
  });

  //   try {
  //     const prediction = await db
  //       .deleteFrom('prediction')
  //       .where('user_id', '=', predictionUserId)
  //       .where('id', '=', predictionId)
  //       .returningAll()
  //       .executeTakeFirstOrThrow();
  //     return JSON.stringify({
  //       type: 4,
  //       data: {
  //         embeds: [
  //           {
  //             title: 'Prediction Cancelled',
  //             description: prediction.conditions,
  //             color: 0xffff00,
  //             fields: [
  //               {
  //                 name: 'By',
  //                 value: `<@${prediction.user_id}>`,
  //                 inline: false,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     });
  //   } catch {
  //     return JSON.stringify({
  //       type: 4,
  //       data: {
  //         content: `<@${predictionUserId}> Cancellation failed because the prediction does not exist or it is not your prediction.`,
  //       },
  //     });
  //   }
};
