import dynamoose from 'dynamoose';
import { Document } from 'dynamoose/dist/Document';
import { ModelType } from 'dynamoose/dist/General';
import { Schema } from 'dynamoose/dist/Schema';

export abstract class EntityClass extends Document {
  pk: string;
  sk: string;
}

export const entity = <T extends Document>(s: Schema): ModelType<T> => {
  if (!process.env.TABLE_NAME) throw new Error('table name undefined');
  return dynamoose.model<T>(process.env.TABLE_NAME, s);
};
