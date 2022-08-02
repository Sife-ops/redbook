import { Service } from "electrodb";

import { JudgeEntity } from './judge'
import { PredictionEntity } from './prediction'

export const redbookModel = new Service({
  JudgeEntity,
  PredictionEntity,
})

