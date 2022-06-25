import { db } from '../model-sql';
import { optionValue } from './utility';

export const vote = async (body: any) => {
  /*
   * 1) voter must be a judge
   * 2) check prediction verdict
   * 3) update judge verdict
   * 4) count votes
   * 5) decide vote
   */

  // 1) voter must be a judge
  const voterUserId = body.member.user.id;
  const { options } = body.data;
  const predictionId = optionValue(options, 'id');

  let judge;
  try {
    judge = await db
      .selectFrom('judge')
      .select('id')
      .where('prediction_id', '=', predictionId)
      .where('user_id', '=', voterUserId)
      .executeTakeFirstOrThrow();
  } catch {
    return JSON.stringify({
      type: 4,
      data: {
        content:
          'Vote failed because the prediction does not exist or you are not a judge.',
      },
    });
  }

  // 2) check prediction verdict
  const prediction = await db
    .selectFrom('prediction')
    .selectAll()
    .where('id', '=', predictionId)
    .executeTakeFirst();

  if (prediction?.verdict !== null) {
    return JSON.stringify({
      type: 4,
      data: {
        content: 'Voting on this prediction has ended.',
      },
    });
  }

  // 3) update judge verdict
  const verdict = optionValue(options, 'verdict');

  await db
    .updateTable('judge')
    .set({ verdict })
    .where('id', '=', judge.id)
    .executeTakeFirstOrThrow();

  // 4) count votes
  const judges = await db
    .selectFrom('judge')
    .selectAll()
    .where('prediction_id', '=', predictionId)
    .execute();

  const count = judges.reduce(
    (a: { yes: number; no: number; undecided: number }, c) => {
      if (c.verdict === undefined) {
        return {
          ...a,
          undecided: a.undecided + 1,
        };
      } else if (c.verdict === true) {
        return {
          ...a,
          yes: a.yes + 1,
        };
      } else {
        return {
          ...a,
          no: a.no + 1,
        };
      }
    },
    {
      yes: 0,
      no: 0,
      undecided: 0,
    }
  );

  // 5) decide vote
  if (count.undecided < 1) {
    if (count.yes < 1) {
      await db
        .updateTable('prediction')
        .set({ verdict: false })
        .where('id', '=', predictionId)
        .executeTakeFirstOrThrow();
      return JSON.stringify({
        type: 4,
        data: {
          content: `The prediction "${prediction.conditions}" by ${prediction.user_id} has been voted incorrect by ...`,
        },
      });
    } else {
      await db
        .updateTable('prediction')
        .set({ verdict: true })
        .where('id', '=', predictionId)
        .executeTakeFirstOrThrow();
      return JSON.stringify({
        type: 4,
        data: {
          content: `Congratulations ${prediction.user_id}! Your prediction has been voted correct by ...`,
        },
      });
    }
  } else {
    return JSON.stringify({
      type: 4,
      data: {
        content: `Thank you for voting, ${voterUserId}!`,
      },
    });
  }
};
