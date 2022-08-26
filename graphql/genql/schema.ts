import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    String: string,
    ID: string,
    Int: number,
    Boolean: boolean,
}

export interface Comment {
    comment: Scalars['String']
    commentId: Scalars['ID']
    created_at: Scalars['Int']
    dislikes: Scalars['Int']
    likes: Scalars['Int']
    predictionId: Scalars['ID']
    replyTo?: Scalars['String']
    user: User
    __typename: 'Comment'
}

export interface Judge {
    predictionId: Scalars['String']
    user: User
    verdict: Scalars['String']
    __typename: 'Judge'
}

export interface Mutation {
    comment: Comment
    rateComment: Scalars['String']
    ratePrediction: Scalars['String']
    __typename: 'Mutation'
}

export interface Prediction {
    comments: Comment[]
    conditions: Scalars['String']
    created_at: Scalars['Int']
    dislikes: Scalars['Int']
    judges: Judge[]
    likes: Scalars['Int']
    predictionId: Scalars['ID']
    user: User
    verdict: Scalars['String']
    __typename: 'Prediction'
}

export interface Query {
    prediction: Prediction
    predictions: Prediction[]
    __typename: 'Query'
}

export interface User {
    avatar: Scalars['String']
    created_at: Scalars['Int']
    discriminitor: Scalars['String']
    userId: Scalars['String']
    username: Scalars['String']
    __typename: 'User'
}

export interface CommentRequest{
    comment?: boolean | number
    commentId?: boolean | number
    created_at?: boolean | number
    dislikes?: boolean | number
    likes?: boolean | number
    predictionId?: boolean | number
    replyTo?: boolean | number
    user?: UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface JudgeRequest{
    predictionId?: boolean | number
    user?: UserRequest
    verdict?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    comment?: [{comment: Scalars['String'],predictionId: Scalars['String']},CommentRequest]
    rateComment?: [{commentId: Scalars['String'],predictionId: Scalars['String'],rating: Scalars['Boolean']}]
    ratePrediction?: [{predictionId: Scalars['String'],rating: Scalars['Boolean']}]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PredictionRequest{
    comments?: CommentRequest
    conditions?: boolean | number
    created_at?: boolean | number
    dislikes?: boolean | number
    judges?: JudgeRequest
    likes?: boolean | number
    predictionId?: boolean | number
    user?: UserRequest
    verdict?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    prediction?: [{predictionId: Scalars['String']},PredictionRequest]
    predictions?: [{userId: Scalars['String']},PredictionRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserRequest{
    avatar?: boolean | number
    created_at?: boolean | number
    discriminitor?: boolean | number
    userId?: boolean | number
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



const User_possibleTypes: string[] = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}


export interface CommentPromiseChain{
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    commentId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    dislikes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    likes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    replyTo: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>})
}

export interface CommentObservableChain{
    comment: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    commentId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    dislikes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    likes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    replyTo: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>})
}

export interface JudgePromiseChain{
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface JudgeObservableChain{
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface MutationPromiseChain{
    comment: ((args: {comment: Scalars['String'],predictionId: Scalars['String']}) => CommentPromiseChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Promise<FieldsSelection<Comment, R>>}),
    rateComment: ((args: {commentId: Scalars['String'],predictionId: Scalars['String'],rating: Scalars['Boolean']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    ratePrediction: ((args: {predictionId: Scalars['String'],rating: Scalars['Boolean']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface MutationObservableChain{
    comment: ((args: {comment: Scalars['String'],predictionId: Scalars['String']}) => CommentObservableChain & {get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>) => Observable<FieldsSelection<Comment, R>>}),
    rateComment: ((args: {commentId: Scalars['String'],predictionId: Scalars['String'],rating: Scalars['Boolean']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    ratePrediction: ((args: {predictionId: Scalars['String'],rating: Scalars['Boolean']}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PredictionPromiseChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Promise<FieldsSelection<Comment, R>[]>}),
    conditions: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    dislikes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    judges: ({get: <R extends JudgeRequest>(request: R, defaultValue?: FieldsSelection<Judge, R>[]) => Promise<FieldsSelection<Judge, R>[]>}),
    likes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PredictionObservableChain{
    comments: ({get: <R extends CommentRequest>(request: R, defaultValue?: FieldsSelection<Comment, R>[]) => Observable<FieldsSelection<Comment, R>[]>}),
    conditions: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    dislikes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    judges: ({get: <R extends JudgeRequest>(request: R, defaultValue?: FieldsSelection<Judge, R>[]) => Observable<FieldsSelection<Judge, R>[]>}),
    likes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    predictionId: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface QueryPromiseChain{
    prediction: ((args: {predictionId: Scalars['String']}) => PredictionPromiseChain & {get: <R extends PredictionRequest>(request: R, defaultValue?: FieldsSelection<Prediction, R>) => Promise<FieldsSelection<Prediction, R>>}),
    predictions: ((args: {userId: Scalars['String']}) => {get: <R extends PredictionRequest>(request: R, defaultValue?: FieldsSelection<Prediction, R>[]) => Promise<FieldsSelection<Prediction, R>[]>})
}

export interface QueryObservableChain{
    prediction: ((args: {predictionId: Scalars['String']}) => PredictionObservableChain & {get: <R extends PredictionRequest>(request: R, defaultValue?: FieldsSelection<Prediction, R>) => Observable<FieldsSelection<Prediction, R>>}),
    predictions: ((args: {userId: Scalars['String']}) => {get: <R extends PredictionRequest>(request: R, defaultValue?: FieldsSelection<Prediction, R>[]) => Observable<FieldsSelection<Prediction, R>[]>})
}

export interface UserPromiseChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    discriminitor: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface UserObservableChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    created_at: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    discriminitor: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    userId: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    username: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}