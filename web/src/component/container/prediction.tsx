import 'twin.macro';
import React from 'react';
import { Container } from '../styled/container';
import { Prediction as PredictionType } from '../../../../graphql/genql/schema';

export const Prediction: React.FC<{ prediction: PredictionType }> = props => {
  const date = new Date(props.prediction.created_at);

  return (
    <Container>
      <h3 tw="text-center text-lg">{props.prediction.predictionId}</h3>
      <div tw="flex flex-row gap-2">
        <div tw="flex-grow">
          <div>
            <span tw="italic">Conditions:</span>
            <p>{props.prediction.conditions}</p>
          </div>
          <div>
            <span tw="italic">Made on:</span>
            <p>{date.toLocaleDateString()}</p>
          </div>
        </div>
        <div>
          <span tw="italic">Judges:</span>
          {props.prediction.judges.map(e => (
            <p key={e.judgeId}>
              {e.username}#{e.discriminator}
            </p>
          ))}
        </div>
        <div>
          <span tw="italic">Verdict:</span>
          <p>
            {(() => {
              if (props.prediction.verdict === null) {
                return 'Undecided';
              } else if (props.prediction.verdict) {
                return 'Correct';
              } else {
                return 'Incorrect';
              }
            })()}
          </p>
        </div>
      </div>
    </Container>
  );
};
