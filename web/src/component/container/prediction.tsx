import React from 'react';
import tw from 'twin.macro';
import { Prediction as PredictionType } from '../../../../graphql/genql/schema';
import { User } from '../element/user';

export const Prediction: React.FC<{ prediction: PredictionType }> = props => {
  const date = new Date(props.prediction.created_at);

  return (
    <div
      css={[
        tw`mb-2 p-2 rounded-md bg-gray-700`,
        () => {
          if (props.prediction.verdict === true) {
            return tw`bg-green-900 border-2 border-solid border-green-500`;
          } else if (props.prediction.verdict === false) {
            return tw`bg-red-900 border-2 border-solid border-red-500`;
          }
        }
      ]}
    >
      <h3 tw="text-center text-lg">{props.prediction.predictionId}</h3>
      <div tw="flex flex-row gap-4">
        <div tw="flex flex-col flex-grow">
          <div tw="flex-grow">
            <span tw="text-xs">Conditions:</span>
            <p>{props.prediction.conditions}</p>
          </div>
          <div>
            <p tw="text-xs">{date.toLocaleDateString()}</p>
          </div>
        </div>
        <div>
          <span tw="text-xs">Judges:</span>
          <div tw="flex flex-col gap-2">
            {props.prediction.judges.map(e => (
              <User
                key={e.judgeId}
                type="judge"
                user={{
                  ...e,
                  userId: e.judgeId
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
