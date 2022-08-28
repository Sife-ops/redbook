import { Service } from "electrodb";

import { CommentEntity } from './comment'
import { PredictionEntity } from './prediction'
import { RatingEntity } from './rating'
import { UserEntity } from './user';
import { VerdictEntity } from './verdict'

export { CommentEntityType } from './comment'
export { PredictionEntityType } from './prediction'
export { RatingEntityType } from './rating'
export { UserEntityType } from './user';
export { VerdictEntityType } from './verdict'

export const redbookModel = new Service({
  CommentEntity,
  PredictionEntity,
  RatingEntity,
  UserEntity,
  VerdictEntity,
})
