import nacl from 'tweetnacl';
import { Event } from './utility';

// todo: need test
export const verify = (event: Event) => {
  const signature = event.headers['x-signature-ed25519'];
  const timestamp = event.headers['x-signature-timestamp'];

  if (!signature) {
    throw new Error('signature undefined');
  }

  const verified = nacl.sign.detached.verify(
    Buffer.from(timestamp + event.body),
    Buffer.from(signature, 'hex'),
    Buffer.from(process.env.PUBLIC_KEY, 'hex')
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
