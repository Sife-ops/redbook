import AWS from 'aws-sdk';
import { redbookModel } from '@redbook/lib/db';

const S3 = new AWS.S3();
const { BUCKET } = process.env;

// {
//     "avatar": "c0e2c2b28449604ccaaaf09c09a0645d",
//     "created_at": "2022-07-08T04:02:15.473Z",
//     "discriminator": "7457",
//     "conditions": "It will be claimed by officials that the gun Shinzo Abe was shot with is not actually a gun.",
//     "predictionId": "victorious-flustered-workbench",
//     "verdict": true,
//     "prognosticatorId": "106206437755084800",
//     "username": "NemoRed"
//   }
//   {
//     "predictionId": "delayed-friendly-wealth",
//     "avatar": "c0e2c2b28449604ccaaaf09c09a0645d",
//     "username": "NemoRed",
//     "discriminator": "7457",
//     "judgeId": "106206437755084800"
//   }

interface Prediction {
  avatar: string;
  created_at: string;
  discriminator: string;
  conditions: string;
  predictionId: string;
  verdict: boolean;
  prognosticatorId: string;
  username: string;
}

interface Judge {
  predictionId: string;
  avatar: string;
  username: string;
  discriminator: string;
  judgeId: string;
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

  } catch (e) {
    console.log(e);
  }

};
