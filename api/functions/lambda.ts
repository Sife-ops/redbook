import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import nacl from "tweetnacl";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const publicKey = process.env.PUBLIC_KEY;
  const signature = event.headers["x-signature-ed25519"];
  const timestamp = event.headers["x-signature-timestamp"];
  const bodyStr = event.body;

  console.log(`___${publicKey}___`);

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
  }

  const body = JSON.parse(bodyStr);
  console.log("body", body);

  if (body.type === 1) {
    return {
      statusCode: 200,
      body: event.body,
    };
  }

  if (body.data.name === "foo") {
    return JSON.stringify({
      type: 4,
      data: {
        content: "bar",
      },
    });
  }

  return {
    statusCode: 404,
  };
};
