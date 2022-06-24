import model from '../model';
import { faker } from '@faker-js/faker';
import {} from 'discord-api-types/v10'

export const prediction = async (body: any) => {
  /*
   * 1) Create prediction.
   * 2) Create predictionUser.
   * 3) Show details.
   */

  // 1) Create prediction.
  const { username, discriminator } = body.member.user;

  // todo: hyphenate discriminator
  const pk = `${username}${discriminator}`;
  let sk = `prediction:${mnemonic()}`;

  while (true) {
    // todo: need to query predictionUserIndex
    const found = await model.prediction
      .query('pk')
      .eq(pk)
      .where('sk')
      .eq(sk)
      .exec();

    if (found.length < 1) {
      break;
    }

    sk = `prediction:${mnemonic()}`;
  }

  const conditions = body.data.options.find(
    (e: any) => e.name === 'conditions'
  ).value;

  const prediction = await model.prediction.create({
    pk,
    sk,
    conditions,
  });

  console.log('prediction', prediction);

  // 2) Create predictionUser.
  // todo: can't add self as judge
  const judgeValue = body.data.options.find(
    (e: any) => e.name === 'judge'
  ).value;

  const judge = body.data.resolved.users[judgeValue];

  const predictionUser = await model.prediction.create({
    pk,
    sk: `${sk}#${judge.username}${judge.discriminator}`,
    prediction: sk,
  });

  console.log('predictionUser', predictionUser);

  // 3) Show details.
  return JSON.stringify({
    type: 4,
    data: {
      // todo: formatting
      content: `New prediction by ${username}: "${conditions}".
Default judge: ${judge.username}.
Prediction ID: ${sk.split(':')[1]}`,
    },
  });
};

const mnemonic = () => {
  const a = faker.word.adjective();
  const b = faker.word.adjective();
  const c = faker.word.noun();
  return `${a}-${b}-${c}`;
};
