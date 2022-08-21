import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    ID: string,
    Boolean: boolean,
}

export interface Comment {
    avatar: Scalars['String']
    comment: Scalars['String']
    commentId: Scalars['ID']
    commenterId: Scalars['String']
    created_at: Scalars['String']
    discriminator: Scalars['String']
    predictionId: Scalars['ID']
    ratings: Rating[]
    replyTo?: Scalars['String']
    username: Scalars['String']
    __typename: 'Comment'
}

export interface Judge {
    avatar: Scalars['String']
    discriminator: Scalars['String']
    judgeId: Scalars['ID']
    predictionId: Scalars['String']
    username: Scalars['String']
    verdict?: Scalars['Boolean']
    __typename: 'Judge'
}

export interface Mutation {
    comment: Comment
    rate: Scalars['String']
    __typename: 'Mutation'
}

export interface Prediction {
    avatar: Scalars['String']
    comments: Comment[]
    conditions: Scalars['String']
    created_at: Scalars['String']
    discriminator: Scalars['String']
    judges: Judge[]
    predictionId: Scalars['ID']
    prognosticatorId: Scalars['String']
    ratings: Rating[]
    username: Scalars['String']
    verdict?: Scalars['Boolean']
    __typename: 'Prediction'
}

export interface Query {
    prediction: Prediction
    __typename: 'Query'
}

export interface Rating {
    avatar: Scalars['String']
    commentId: Scalars['ID']
    criticId: Scalars['String']
    discriminator: Scalars['String']
    like: Scalars['Boolean']
    predictionId: Scalars['ID']
    username: Scalars['String']
    __typename: 'Rating'
}

export interface CommentRequest{
    avatar?: boolean | number
    comment?: boolean | number
    commentId?: boolean | number
    commenterId?: boolean | number
    created_at?: boolean | number
    discriminator?: boolean | number
    predictionId?: boolean | number
    ratings?: RatingRequest
    replyTo?: boolean | number
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface JudgeRequest{
    avatar?: boolean | number
    discriminator?: boolean | number
    judgeId?: boolean | number
    predictionId?: boolean | number
    username?: boolean | number
    verdict?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    comment?: [{comment: Scalars['String']},CommentRequest]
    rate?: [{commentId?: (Scalars['String'] | null),like: Scalars['Boolean']}]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PredictionRequest{
    avatar?: boolean | number
    comments?: CommentRequest
    conditions?: boolean | number
    created_at?: boolean | number
    discriminator?: boolean | number
    judges?: JudgeRequest
    predictionId?: boolean | number
    prognosticatorId?: boolean | number
    ratings?: RatingRequest
    username?: boolean | number
    verdict?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    prediction?: [{predictionId: Scalars['String']},PredictionRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RatingRequest{
    avatar?: boolean | number
    commentId?: boolean | number
    criticId?: boolean | number
    discriminator?: boolean | number
    like?: boolean | number
    predictionId?: boolean | number
    username?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Comment_possibleTypes: string[] = ['Comment']
export const isComment = (obj?: { __typename?: any } | null): obj is Comment => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isComment"')
  return Comment_possibleTypes.includes(obj.__typename)
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


export interface CommentPromiseChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    commentId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    commenterId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    ratings: ({get: <R extends RatingRequest>(request: R, defaultValue?: FieldsSelection<Rating, R>[]) => Promise<FieldsSelection<Rating, R>[]>}),
    replyTo: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface CommentObservableChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    commentId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    commenterId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    ratings: ({get: <R extends RatingRequest>(request: R, defaultValue?: FieldsSelection<Rating, R>[]) => Observable<FieldsSelection<Rating, R>[]>}),
    replyTo: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface JudgePromiseChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    judgeId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>})
}

export interface JudgeObservableChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    judgeId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>})
}

export interface MutationPromiseChain{
    comment: ((args: {comment: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>}),
    rate: ((args: {commentId?: (Scalars['String'] | null),like: Scalars['Boolean']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface MutationObservableChain{
    comment: ((args: {comment: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>}),
    rate: ((args: {commentId?: (Scalars['String'] | null),like: Scalars['Boolean']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PredictionPromiseChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Promise<FieldsSelection<Comment, R>[]>}),
    conditions: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    judges: ({get: <R extends JudgeRequest>(request: R, defaultValue?: FieldsSelection<Judge, R>[]) => Promise<FieldsSelection<Judge, R>[]>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    prognosticatorId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    ratings: ({get: <R extends RatingRequest>(request: R, defaultValue?: FieldsSelection<Rating, R>[]) => Promise<FieldsSelection<Rating, R>[]>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>})
}

export interface PredictionObservableChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Observable<FieldsSelection<Comment, R>[]>}),
    conditions: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    judges: ({get: <R extends JudgeRequest>(request: R, defaultValue?: FieldsSelection<Judge, R>[]) => Observable<FieldsSelection<Judge, R>[]>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    prognosticatorId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    ratings: ({get: <R extends RatingRequest>(request: R, defaultValue?: FieldsSelection<Rating, R>[]) => Observable<FieldsSelection<Rating, R>[]>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>})
}

export interface QueryPromiseChain{
    prediction: ((args: {predictionId: Scalars['String']}) => PredictionPromiseChain & {get: <R extends PredictionRequest>(request: R, defaultValue?: FieldsSelection<Prediction, R>) => Promise<FieldsSelection<Prediction, R>>})
}

export interface QueryObservableChain{
    prediction: ((args: {predictionId: Scalars['String']}) => PredictionObservableChain & {get: <R extends PredictionRequest>(request: R, defaultValue?: FieldsSelection<Prediction, R>) => Observable<FieldsSelection<Prediction, R>>})
}

export interface RatingPromiseChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    commentId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    criticId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    like: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface RatingObservableChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    commentId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    criticId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    discriminator: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    like: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}