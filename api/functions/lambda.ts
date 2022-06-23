import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import util from 'util';
import nacl from 'tweetnacl';
import model, { PredictionClass } from '../lib/model';
import { faker } from '@faker-js/faker';

const publicKey = process.env.PUBLIC_KEY;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
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

  /*
   * Commands
   */

  if (body.type === 2) {
    const { username, discriminator } = body.member.user;

    switch (body.data.name) {
      case 'foo': {
        return JSON.stringify({
          type: 4,
          data: {
            content: 'bar',
          },
        });
      }

      case 'prediction': {
        // todo: can't allow self as judge

        /*
         * 1) Create prediction.
         * 2) Create relation.
         * 3) Show details.
         */

        // 1) Create prediction.
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

        const prediction = await model.prediction.create({
          pk,
          sk,
          conditions,
        });

        console.log('prediction', prediction);

        // 2) Create relation.
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
      }

      case 'vote': {
        // voter must be a judge
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

        // update verdict
        const predictionUser = predictionUsers[0];

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
          (
            a: { yes: number; no: number; undecided: number },
            c: PredictionClass
          ) => {
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
            } else if (c.verdict === false) {
              return {
                ...a,
                no: a.no + 1,
              };
            }
            return a;
          },
          {
            yes: 0,
            no: 0,
            undecided: 0,
          }
        );

        //

        console.log(c);

        return JSON.stringify({
          type: 4,
          data: {
            content: 'ok',
          },
        });
      }

      default:
        break;
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
