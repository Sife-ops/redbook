import React, { useEffect } from 'react';
import tw from 'twin.macro';
import { Avatar } from './avatar';
import { useAvatar } from '../hook/avatar';

interface props {
  type?: 'judge';
  user: {
    userId: string;
    username: string;
    discriminator: string;
    avatar: string;
  };
  verdict?: string;
}

export const User: React.FC<props> = props => {
  return (
    <div
      css={[
        tw`flex gap-2 text-sm p-2 rounded-md bg-gray-800 w-[150px]`,
        () => {
          if (props.type === 'judge') {
            // todo: fix verdict type
            if (props.verdict === 'correct') {
              return tw`bg-green-900 border-2 border-solid border-green-500`;
            } else if (props.verdict === 'incorrect') {
              return tw`bg-red-900 border-2 border-solid border-red-500`;
            }
          }
        }
      ]}
    >
      <div tw="flex flex-col justify-center">
        <Avatar user={props.user}/>
      </div>
      <div tw="flex flex-col justify-center">
        <p tw="break-all">{props.user.username}</p>
        <div tw="text-gray-400">#{props.user.discriminator}</div>
      </div>
    </div>
  );
};
