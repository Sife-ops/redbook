import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import util from 'util';
import nacl from 'tweetnacl';
import model from '../lib/model';

const publicKey = process.env.PUBLIC_KEY;
const tableName = process.env.TABLE_NAME;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log('env', publicKey, tableName);

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
  // console.log('body', util.inspect(body, false, null, true));

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
        const { username, discriminator } = body.member.user;
        // console.log(username, discriminator);

        const a = await model.prediction.create({
          pk: `${username}${discriminator}`,
          sk: 'test',
          conditions: 'test',
          correct: 'test',
        });

        console.log(a);

        return JSON.stringify({
          type: 4,
          data: {
            content: 'ok',
          },
        });
    }
  }

  return {
    statusCode: 404,
  };
};
