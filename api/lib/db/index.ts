import { Service } from "electrodb";

import { JudgeEntity } from './judge'
import { PredictionEntity } from './prediction'

export { JudgeEntityType } from './judge'
export { PredictionEntityType } from './prediction'

export const redbookModel = new Service({
  JudgeEntity,
  PredictionEntity,
})

