import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    ID: string,
    Boolean: boolean,
    Int: number,
}

export interface Judge {
    discriminator?: Scalars['String']
    judgeId: Scalars['ID']
    predictionId: Scalars['String']
    username?: Scalars['String']
    verdict?: Scalars['Boolean']
    __typename: 'Judge'
}

export interface Mutation {
    mello: Scalars['String']
    rate: Rating
    __typename: 'Mutation'
}

export interface Prediction {
    avatar: Scalars['String']
    conditions: Scalars['String']
    created_at: Scalars['String']
    discriminator: Scalars['String']
    judges: Judge[]
    predictionId: Scalars['ID']
    prognosticatorId: Scalars['String']
    username: Scalars['String']
    verdict?: Scalars['Boolean']
    __typename: 'Prediction'
}

export interface Query {
    hello: Scalars['String']
    prediction: Prediction
    __typename: 'Query'
}

export interface Rating {
    dislikes: Scalars['Int']
    likes: Scalars['Int']
    __typename: 'Rating'
}

export interface JudgeRequest{
    discriminator?: boolean | number
    judgeId?: boolean | number
    predictionId?: boolean | number
    username?: boolean | number
    verdict?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    mello?: boolean | number
    rate?: [{like: Scalars['Boolean'],predictionId: Scalars['String']},RatingRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PredictionRequest{
    avatar?: boolean | number
    conditions?: boolean | number
    created_at?: boolean | number
    discriminator?: boolean | number
    judges?: JudgeRequest
    predictionId?: boolean | number
    prognosticatorId?: boolean | number
    username?: boolean | number
    verdict?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    hello?: boolean | number
    prediction?: [{predictionId: Scalars['String']},PredictionRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RatingRequest{
    dislikes?: boolean | number
    likes?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Judge_possibleTypes: string[] = ['Judge']
export const isJudge = (obj?: { __typename?: any } | null): obj is Judge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isJudge"')
  return Judge_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Prediction_possibleTypes: string[] = ['Prediction']
export const isPrediction = (obj?: { __typename?: any } | null): obj is Prediction => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPrediction"')
  return Prediction_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Rating_possibleTypes: string[] = ['Rating']
export const isRating = (obj?: { __typename?: any } | null): obj is Rating => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRating"')
  return Rating_possibleTypes.includes(obj.__typename)
}


export interface JudgePromiseChain{
    discriminator: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    judgeId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>})
}

export interface JudgeObservableChain{
    discriminator: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    judgeId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>})
}

export interface MutationPromiseChain{
    mello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    rate: ((args: {like: Scalars['Boolean'],predictionId: Scalars['String']}) => RatingPromiseChain & {get: <R extends RatingRequest>(request: R, defaultValue?: FieldsSelection<Rating, R>) => Promise<FieldsSelection<Rating, R>>})
}

export interface MutationObservableChain{
    mello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    rate: ((args: {like: Scalars['Boolean'],predictionId: Scalars['String']}) => RatingObservableChain & {get: <R extends RatingRequest>(request: R, defaultValue?: FieldsSelection<Rating, R>) => Observable<FieldsSelection<Rating, R>>})
}

export interface PredictionPromiseChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    conditions: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    judges: ({get: <R extends JudgeRequest>(request: R, defaultValue?: FieldsSelection<Judge, R>[]) => Promise<FieldsSelection<Judge, R>[]>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    prognosticatorId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>})
}

export interface PredictionObservableChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    conditions: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    judges: ({get: <R extends JudgeRequest>(request: R, defaultValue?: FieldsSelection<Judge, R>[]) => Observable<FieldsSelection<Judge, R>[]>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    prognosticatorId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>})
}

export interface QueryPromiseChain{
    hello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    prediction: ((args: {predictionId: Scalars['String']}) => PredictionPromiseChain & {get: <R extends PredictionRequest>(request: R, defaultValue?: FieldsSelection<Prediction, R>) => Promise<FieldsSelection<Prediction, R>>})
}

export interface QueryObservableChain{
    hello: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    prediction: ((args: {predictionId: Scalars['String']}) => PredictionObservableChain & {get: <R extends PredictionRequest>(request: R, defaultValue?: FieldsSelection<Prediction, R>) => Observable<FieldsSelection<Prediction, R>>})
}

export interface RatingPromiseChain{
    dislikes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    likes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})
}

export interface RatingObservableChain{
    dislikes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    likes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})
}