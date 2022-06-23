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
  const { username, discriminator } = body.member.user;
  const id = body.data.options.find((e: any) => e.name === 'id').value;

  const sk = `prediction:${id}`;

  const predictionUserRes: PredictionClass[] = await model.prediction
    .query('prediction')
    .eq(sk)
    .where('sk')
    .eq(`${sk}#${username}${discriminator}`)
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
    (a: { yes: number; no: number; undecided: number }, c: PredictionClass) => {
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
  const voterUsernames = predictionUsersRes.reduce((a: string, c, i, arr) => {
    const nick = getNick(c.sk.split('#')[1]);
    if (arr.length < 2) {
      return nick;
    } else if (arr.length < 3) {
      if (i === 0) {
        return `${nick}`;
      } else {
        return `${a} and ${nick}`;
      }
    } else {
      if (i < arr.length - 1) {
        return `${a}${nick}, `;
      } else {
        return `${a}and ${nick}`;
      }
    }
  }, '');

  if (count.undecided > 0) {
    return JSON.stringify({
      type: 4,
      data: {
        content: `Thank you for voting, ${getNick(username)}!`,
      },
    });
  } else if (count.yes < 1) {
    await model.prediction.update({
      ...predictionRes,
      verdict: false,
    });
    return JSON.stringify({
      type: 4,
      data: {
        content: `The prediction ${predictionRes.conditions} by ${getNick(
          predictionRes.pk
        )} has been voted incorrect by ${voterUsernames}.`,
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
        )}! Your prediction has been voted correct by ${voterUsernames}.`,
      },
    });
  }
};

const getNick = (i: string) => {
  return i.slice(0, i.length - 4);
};
