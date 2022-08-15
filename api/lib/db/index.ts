import { Service } from "electrodb";

import { CommentEntity } from './comment'
import { JudgeEntity } from './judge'
import { PredictionEntity } from './prediction'
import { RatingEntity } from './rating'

export { CommentEntityType } from './comment'
export { JudgeEntityType } from './judge'
export { PredictionEntityType } from './prediction'
export { RatingEntityType } from './rating'

export const redbookModel = new Service({
  CommentEntity,
  JudgeEntity,
  PredictionEntity,
  RatingEntity,
})

