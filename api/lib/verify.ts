import nacl from 'tweetnacl';
import { Event } from './event';

const { PUBLIC_KEY } = process.env;

export const verify = (event: Event) => {
  const signature = event.headers['x-signature-ed25519'];
  const timestamp = event.headers['x-signature-timestamp'];

  if (!PUBLIC_KEY || !signature || !timestamp) {
    throw new Error('something wrong');
  }

  const verified = nacl.sign.detached.verify(
    Buffer.from(timestamp + event.body),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!verified) {
    return {
      statusCode: 401,
      body: event.body,
    };
  } else {
    return {
      statusCode: 200,
      body: event.body,
    };
  }
};
