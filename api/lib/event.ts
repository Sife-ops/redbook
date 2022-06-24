import { APIGatewayProxyEventV2 } from 'aws-lambda';

export type Event = APIGatewayProxyEventV2 & { body: string };
