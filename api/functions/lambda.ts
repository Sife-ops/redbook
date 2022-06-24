import nacl from 'tweetnacl';
import util from 'util';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import * as command from '../lib/command';

const publicKey = process.env.PUBLIC_KEY;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  /*
   * verification
   */

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

  /*
   * Commands
   */

  if (body.type === 2) {
    try {
      //@ts-ignore
      return await command[body.data.name](body);
    } catch (ex: unknown) {
      console.log(ex);
    }
  }

  return {
    statusCode: 404,
  };
};
