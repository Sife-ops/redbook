import 'twin.macro';
import React from 'react';
import spinner from '../assets/spinner.gif';

export const Loading: React.FC = props => {
  return (
    <div tw="flex flex-col justify-center h-full">
      <div tw="flex justify-center">
        <img src={spinner} tw="w-16" />
      </div>
    </div>
  );
};
