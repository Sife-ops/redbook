import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import util from 'util';
import nacl from 'tweetnacl';
import model from '../lib/model';
import { faker } from '@faker-js/faker';

const publicKey = process.env.PUBLIC_KEY;
const tableName = process.env.TABLE_NAME;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // console.log('env', publicKey, tableName);

  const signature = event.headers['x-signature-ed25519'];
  const timestamp = event.headers['x-signature-timestamp'];
  const bodyStr = event.body;

  const responseBad = {
    statusCode: 401,
    body: event.body,
  };

  if (!publicKey || !signature || !timestamp || !bodyStr) {
    return responseBad;
  }

  const verified = nacl.sign.detached.verify(
    Buffer.from(timestamp + bodyStr),
    Buffer.from(signature, 'hex'),
    Buffer.from(publicKey, 'hex')
  );

  if (!verified) {
    return responseBad;
  }

  const body = JSON.parse(bodyStr);
  console.log('body', util.inspect(body, false, null, true));

  if (body.type === 1) {
    return {
      statusCode: 200,
      body: event.body,
    };
  }

  if (body.type === 2) {
    switch (body.data.name) {
      case 'foo':
        return JSON.stringify({
          type: 4,
          data: {
            content: 'bar',
          },
        });

      default:
      case 'prediction':
        // todo: can't allow self as judge

        /*
         * 1) Create prediction.
         * 2) Create relation.
         * 3) Show details.
         */

        // 1) Create prediction.
        const { username, discriminator } = body.member.user;

        const pk = `${username}${discriminator}`;
        let sk = `prediction:${mnemonic()}`;

        while (true) {
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
        const judgeValue = body.data.options.find(
          (e: any) => e.name === 'judge'
        ).value;
        const judge = body.data.resolved.users[judgeValue];

        const prediction = await model.prediction.create({
          pk,
          sk,
          conditions,
        });

        console.log('prediction', prediction);

        // 2) Create relation.
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
    }
  }

  return {
    statusCode: 404,
  };
};

const mnemonic = () => {
  const a = faker.word.adjective();
  const b = faker.word.adjective();
  const c = faker.word.noun();
  return `${a}-${b}-${c}`;
};
