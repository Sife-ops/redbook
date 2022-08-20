import nacl from 'tweetnacl';
import { Event } from './utility';

// todo: need test
// todo: use discord-interactions https://github.com/discord/discord-interactions-js
// Discord API Reference: https://discord.com/developers/docs/interactions/receiving-and-responding#security-and-authorization
export const verify = (event: Event) => {
  const signature = event.headers['x-signature-ed25519'];
  const timestamp = event.headers['x-signature-timestamp'];

  const verified = nacl.sign.detached.verify(
    Buffer.from(timestamp + event.body),
    Buffer.from(signature!, 'hex'),
    Buffer.from(process.env.PUBLIC_KEY, 'hex')
  );

  if (!verified) {
    return {
      statusCode: 401,
    };
  } else {
    return {
      statusCode: 200,
      body: event.body,
    };
  }
};
