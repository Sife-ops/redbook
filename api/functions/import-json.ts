import AWS from 'aws-sdk';
import { redbookModel } from '@redbook/lib/db';

const S3 = new AWS.S3();
const sqs = new AWS.SQS();
const { BUCKET, ONBOARD_SQS } = process.env;

interface Prediction {
  avatar: string;
  created_at: string;
  discriminator: string;
  conditions: string;
  predictionId: string;
  verdict: boolean | undefined;
  prognosticatorId: string;
  username: string;
}

interface Judge {
  predictionId: string;
  avatar: string;
  username: string;
  discriminator: string;
  judgeId: string;
  verdict: boolean | undefined;
}

export const handler = async () => {

  try {

    const res = await S3.listObjects({
      Bucket: BUCKET!,
    }).promise()

    const latest = res.Contents?.sort((a: any, b: any) => {
      return b.LastModified - a.LastModified;
    })[0];

    if (!latest) {
      throw new Error('no files')
    }

    const obj = await S3.getObject({
      Bucket: BUCKET!,
      Key: latest.Key!
    }).promise()

    const jsObj = JSON.parse(obj.Body?.toString()!)

    const { predictions, judges } = jsObj as {
      predictions: Prediction[];
      judges: Judge[];
    }

    /*
     * import users
     */

    [
      ...predictions.map(e => ({
        id: e.prognosticatorId,
        username: e.username,
        discriminator: e.discriminator,
        avatar: e.avatar,
      })),
      ...judges.map(e => ({
        id: e.judgeId,
        username: e.username,
        discriminator: e.discriminator,
        avatar: e.avatar,
      })),
    ]
      .map(async (e) => {
        await sqs
          .sendMessage({
            QueueUrl: ONBOARD_SQS!,
            MessageBody: JSON.stringify(e),
          })
          .promise();
      });

    /*
     * import predictions
     */

    const verdict = (i: boolean | undefined) => {
      if (i === undefined) {
        return 'none';
      } else if (i) {
        return 'correct';
      } else {
        return 'incorrect';
      }
    }

    predictions.map(async (e) => {
      await redbookModel
        .entities
        .PredictionEntity
        .create({
          userId: e.prognosticatorId,
          predictionId: e.predictionId,
          conditions: e.conditions,
          created_at: Date.parse(e.created_at).toString(),
          verdict: verdict(e.verdict)
        })
        .go()
    });

    judges.map(async (e) => {
      await redbookModel
        .entities
        .VerdictEntity
        .create({
          userId: e.judgeId || 'FUCK',
          predictionId: e.predictionId || 'FUCK',
          verdict: verdict(e.verdict)
        })
        .go()
    });

  } catch (e) {
    console.log(e);
  }

};
