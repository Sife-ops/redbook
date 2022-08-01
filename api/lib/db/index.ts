import { Service } from "electrodb";

import { JudgeEntity } from './judge'
import { PredictionEntity } from './prediction'
import { PrognosticatorEntity } from './prognosticator'

export const redbookModel = new Service({
  JudgeEntity,
  PredictionEntity,
  PrognosticatorEntity
})

