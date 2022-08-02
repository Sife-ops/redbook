import util from 'util';
import { db } from '@redbook/lib/model';
import { redbookModel } from '@redbook/lib/db'

export const handler = async () => {
  const users = await db.selectFrom('user').selectAll().execute();
  const predictions = await db.selectFrom('prediction').selectAll().execute();
  const judges = await db.selectFrom('judge').selectAll().execute();

  const data = users.map((user) => ({
    ...user,
    predictions: predictions
      .filter((prediction) => prediction.user_id === user.id)
      .map((prediction) => ({
        ...prediction,
        judges: judges.filter((judge) => judge.prediction_id === prediction.id),
      })),
  }));

  console.log('body', util.inspect(data, false, null, true));

  for (const user of data) {
    for (const prediction of user.predictions) {
      redbookModel.entities.PredictionEntity.create({
        prognosticatorId: user.id,
        predictionId: prediction.id,
        avatar: user.avatar,
        discriminator: user.discriminator,
        username: user.username,
        conditions: prediction.conditions,
        created_at: 'todo',
      }).go()
    }
  }
};

