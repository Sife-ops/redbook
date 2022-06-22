import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import nacl from "tweetnacl";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const publicKey = process.env.PUBLIC_KEY;
  const signature = event.headers["x-signature-ed25519"];
  const timestamp = event.headers["x-signature-timestamp"];
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
    Buffer.from(signature, "hex"),
    Buffer.from(publicKey, "hex")
  );

  if (!verified) {
    return responseBad;
  } else {
    return {
      statusCode: 200,
      body: event.body,
    };
  }
};
