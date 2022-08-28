import 'twin.macro';
import React from 'react';
import spinner from '../assets/spinner.gif';

// todo: can't get rid of scroll
export const Loading: React.FC = () => {
  return (
    <div tw="flex flex-col justify-center h-[200px]">
      <div tw="flex justify-center">
        <img src={spinner} tw="w-16" />
      </div>
    </div>
  );
};
