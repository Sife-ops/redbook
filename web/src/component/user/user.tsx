import React, { useEffect } from 'react';
import tw from 'twin.macro';
import { useAvatar } from '../../hook/avatar';

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
  const { avatar, discriminator, username, userId } = props.user;
  const { avatarImg, fetchAvatar } = useAvatar();

  useEffect(() => {
    fetchAvatar({ userId, avatar });
  }, []);

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
      <div tw="flex flex-col justify-center min-w-[48px] max-w-[48px]">
        {avatarImg && <img tw="rounded-full" src={avatarImg} alt="icons" />}
      </div>
      <div tw="flex flex-col justify-center">
        <p tw="break-all">{username}</p>
        <div tw="text-gray-400">#{discriminator}</div>
      </div>
    </div>
  );
};
