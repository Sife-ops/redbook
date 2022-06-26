import { db } from '../../../model';
import { optionValue } from '../../utility';

export const cancel = async (body: any) => {
  const predictionUserId = body.member.user.id;
  const { options } = body.data.options[0];
  const predictionId = optionValue(options, 'id');

  console.log('cancel', predictionUserId, predictionId);

  try {
    const prediction = await db
      .deleteFrom('prediction')
      .where('user_id', '=', predictionUserId)
      .where('id', '=', predictionId)
      .returningAll()
      .executeTakeFirstOrThrow();

    return JSON.stringify({
      type: 4,
      data: {
        embeds: [
          {
            title: 'Prediction Cancelled',
            description: prediction.conditions,
            color: 0xffff00,
            fields: [
              {
                name: 'By',
                value: `<@${prediction.user_id}>`,
                inline: false,
              },
            ],
          },
        ],
      },
    });
  } catch {
    return JSON.stringify({
      type: 4,
      data: {
        content: `<@${predictionUserId}> Cancellation failed because the prediction does not exist or it is not your prediction.`,
      },
    });
  }
};
