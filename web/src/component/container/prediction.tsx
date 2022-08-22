import 'twin.macro';
import React from 'react';
import { Prediction as PredictionType } from '../../../../graphql/genql/schema';
import { User } from '../element/user';

interface Props {
  type: 'summary' | 'full';
  prediction: PredictionType;
}

export const Prediction: React.FC<Props> = props => {
  const date = new Date(props.prediction.created_at);

  return (
    <div>
      <h3 tw="text-center text-lg">{props.prediction.predictionId}</h3>
      <div tw="flex flex-row gap-4">
        <div tw="flex-grow flex flex-col gap-2">
          <div tw="flex-grow">
            <span tw="italic text-xs text-gray-400">Conditions:</span>
            <p>{props.prediction.conditions}</p>
          </div>
          <div>
            {/* <span tw="italic text-xs text-gray-400">Made on:</span>
            <p tw="text-sm">{date.toLocaleDateString()}</p> */}
            <span tw="italic text-xs text-gray-400">
              {date.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div>
          {props.type === 'full' && (
            <div>
              <span tw="italic text-xs text-gray-400">By:</span>
              <User
                user={{
                  ...props.prediction,
                  userId: props.prediction.prognosticatorId
                }}
              />
            </div>
          )}
          <span tw="italic text-xs text-gray-400">Judges:</span>
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
