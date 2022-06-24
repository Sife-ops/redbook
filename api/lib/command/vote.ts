import model, { PredictionClass } from '../model';

export const vote = async (body: any) => {
  /*
   * 1) voter must be a judge
   * 2) check prediction verdict
   * 3) update predictionUser verdict
   * 4) count votes
   * 5) decide vote
   */

  // 1) voter must be a judge
  const { id } = body.member.user;

  const predictionId = body.data.options.find(
    (e: any) => e.name === 'id'
  ).value;

  const sk = `prediction:${predictionId}`;

  const predictionUserRes: PredictionClass[] = await model.prediction
    .query('prediction')
    .eq(sk)
    .where('sk')
    .eq(`${sk}#${id}`)
    .using('predictionUserIndex')
    .exec();

  if (predictionUserRes.length < 1) {
    return JSON.stringify({
      type: 4,
      data: {
        content:
          'Vote failed because the prediction does not exist or you are not a judge.',
      },
    });
  }

  const predictionUser = predictionUserRes[0];

  // 2) check prediction verdict
  const predictionRes = await model.prediction.get({
    pk: predictionUser.pk,
    sk,
  });

  if (predictionRes.verdict !== undefined) {
    return JSON.stringify({
      type: 4,
      data: {
        content: 'Voting on this prediction has ended.',
      },
    });
  }

  // 3) update predictionUser verdict
  const verdict = body.data.options.find(
    (e: any) => e.name === 'verdict'
  ).value;

  await model.prediction.update({
    ...predictionUser,
    verdict,
  });

  // 4) count votes
  const predictionUsersRes = await model.prediction
    .query('pk')
    .eq(predictionUser.pk)
    .where('sk')
    .beginsWith(`${sk}#`)
    .exec();

  const count = predictionUsersRes.reduce(
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
  const voterIds = predictionUsersRes.reduce((a: string, c, i, arr) => {
    const id = c.sk.split('#')[1];
    if (arr.length < 2) {
      return id;
    } else if (arr.length < 3) {
      if (i === 0) {
        return id;
      } else {
        return `${a} and ${id}`;
      }
    } else {
      if (i < arr.length - 1) {
        return `${a}${id}, `;
      } else {
        return `${a}and ${id}`;
      }
    }
  }, '');

  if (count.undecided < 1) {
    if (count.yes < 1) {
      await model.prediction.update({
        ...predictionRes,
        verdict: false,
      });
      return JSON.stringify({
        type: 4,
        data: {
          content: `The prediction ${predictionRes.conditions} by ${id} has been voted incorrect by ${voterIds}.`,
        },
      });
    } else {
      await model.prediction.update({
        ...predictionRes,
        verdict: true,
      });
      return JSON.stringify({
        type: 4,
        data: {
          content: `Congratulations ${getNick(
            predictionRes.pk
          )}! Your prediction has been voted correct by ${voterIds}.`,
        },
      });
    }
  } else {
    return JSON.stringify({
      type: 4,
      data: {
        content: `Thank you for voting, ${id}!`,
      },
    });
  }
};

const getNick = (i: string) => {
  return i.slice(0, i.length - 4);
};
