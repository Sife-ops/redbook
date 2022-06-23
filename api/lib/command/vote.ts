import model, { PredictionClass } from '../model';

export const vote = async (body: any) => {
  // voter must be a judge
  const { username, discriminator } = body.member.user;

  const id = body.data.options.find((e: any) => e.name === 'id').value;

  const predictionUsers: PredictionClass[] = await model.prediction
    .query('prediction')
    .eq(`prediction:${id}`)
    .where('sk')
    .eq(`prediction:${id}#${username}${discriminator}`)
    .using('predictionUserIndex')
    .exec();

  if (predictionUsers.length < 1) {
    return JSON.stringify({
      type: 4,
      data: {
        content:
          'Vote failed because the prediction does not exist or you are not a judge.',
      },
    });
  }

  const predictionUser = predictionUsers[0];

  // check vote status
  const predictions = await model.prediction
    .query('pk')
    .eq(predictionUser.pk)
    .where('sk')
    .beginsWith(`prediction:${id}`)
    .exec();

  const prediction = predictions.find((e) => e.sk === `prediction:${id}`);
  if (!prediction) throw new Error('missing prediction');

  if (prediction.verdict !== undefined) {
    return JSON.stringify({
      type: 4,
      data: {
        content: 'Voting on this prediction has ended.',
      },
    });
  }

  // update verdict
  const verdict = body.data.options.find(
    (e: any) => e.name === 'verdict'
  ).value;

  const a = await model.prediction.update({
    ...predictionUser,
    verdict,
  });

  // count votes
  const b = await model.prediction
    .query('pk')
    .eq(predictionUser.pk)
    .where('sk')
    .beginsWith(`prediction:${id}#`)
    .exec();

  const c = b.reduce(
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

  // decide vote
  if (c.undecided > 0) {
    return JSON.stringify({
      type: 4,
      data: {
        content: 'Thank you for voting.',
      },
    });
  } else if (c.yes < 1) {
    const res = await model.prediction.update({
      ...prediction,
      verdict: false,
    });
    return JSON.stringify({
      type: 4,
      data: {
        content: 'The prediction ... by ... has been voted incorrect by ...',
      },
    });
  } else {
    const res = await model.prediction.update({
      ...prediction,
      verdict: true,
    });
    return JSON.stringify({
      type: 4,
      data: {
        content:
          'Congratulations ...! Your prediction has been voted correct by ...',
      },
    });
  }
};
