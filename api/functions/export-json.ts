import AWS from 'aws-sdk';
import { redbookModel } from '@redbook/lib/db';

const S3 = new AWS.S3();
const { BUCKET } = process.env;

export const handler = async () => {
  const predictions = await redbookModel
    .entities
    .PredictionEntity
    .scan
    .go()

  const judges = await redbookModel
    .entities
    .JudgeEntity
    .scan
    .go()

  try {
    const res = await S3.putObject({
      Bucket: BUCKET!,
      Key: new Date().toISOString(),
      Body: JSON.stringify({
        predictions,
        judges
      }),
      ContentType: 'application/json',
    }).promise();
    console.log(res);
  } catch (e) {
    console.log(e);
  }

};
