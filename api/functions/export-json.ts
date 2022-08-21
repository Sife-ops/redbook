/*
 * DEPRECATED
 * todo: should be rewritten to use redbookModel
 */

// import AWS from 'aws-sdk';
// import { db } from '@redbook/lib/model';

// const S3 = new AWS.S3();
// const { BUCKET } = process.env;

export const handler = async () => {
  // const users = await db.selectFrom('user').selectAll().execute();
  // const predictions = await db.selectFrom('prediction').selectAll().execute();
  // const judges = await db.selectFrom('judge').selectAll().execute();
  //
  // const data = users.map((user) => ({
  //   ...user,
  //   predictions: predictions
  //     .filter((prediction) => prediction.user_id === user.id)
  //     .map((prediction) => ({
  //       ...prediction,
  //       judges: judges.filter((judge) => judge.prediction_id === prediction.id),
  //     })),
  // }));
  //
  // console.log(data);
  //
  // try {
  //   const res = await S3.putObject({
  //     Bucket: BUCKET!,
  //     Key: new Date().toISOString(),
  //     //   Body: Buffer.from(JSON.stringify(data)),
  //     Body: JSON.stringify(data),
  //     ContentType: 'application/json',
  //   }).promise();
  //   console.log(res);
  // } catch (e) {
  //   console.log(e);
  // }
};
